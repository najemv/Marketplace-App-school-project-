import { Result } from "@badrap/result"
import { PrismaClient } from "@prisma/client";
import { CategoryDTO, OfferDTO, PhotoDTO, UserDTO } from "../types/yaml-types"

const prisma = new PrismaClient();

export const seedUsers = async (users: UserDTO[]): Promise<Result<boolean>> => {
    try {
        users.map(user => createUser(user));

        return Result.ok(true);

    } catch (e) {
        return Result.err(e as Error);
    } finally {
        prisma.$disconnect;
    }
}


const createUser = async (user: UserDTO) => {
    const currUser = await prisma.user.create({
        data: {
            email: user.email,
            nickname: user.nickname,
            password: user.password,
            profilePicture: user.profilePicture,
            description: user.description
        },
    });

    if (user.offers) {
        for (const offer of user.offers) {
            await createOffer(offer, currUser.id);
        }
    }
}


const createOffer = async (offer: OfferDTO, userId: number) => {
    const currOffer = await prisma.offer.create({
        data: {
            title: offer.title,
            description: offer.description,
            price: offer.price,
            place: offer.place,
            finished: offer.finished,
            author: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    for (const category of offer.categories) {
        await upsertCategory(category, currOffer.id);
    }
    
    for (const photo of offer.photos) {
        await createPhoto(photo, currOffer.id);
    }
}


const upsertCategory = async (cat: CategoryDTO, offerId: number) => {
    await prisma.category.upsert({
        where: {
            name: cat.name,
        },
        update: {
            offers: {
                connect: {
                     id: offerId,
                },
            },
        },
        create: {
            name: cat.name,
            offers: {
                connect: {
                    id: offerId,
                },
            },
        },
    });
}


const createPhoto = async (photo: PhotoDTO, offerId: number) => {
    await prisma.photo.create({
        data: {
            path: photo.path,
            description: photo.description,
            offer: {
                connect: { 
                    id: offerId,
                },
            },
        },
    });
}

