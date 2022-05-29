import { object, string, number, date, ValidationError, boolean, array } from 'yup';
import prisma from '../client';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { assert } from 'console';


export const getAll = async (req: Request, res: Response) => {
  const offers = await prisma.offer.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      place: true,
      createdAt: true,
      updatedAt: true,
      finished: true,
      author: {
        select: {
          nickname: true,
          profilePicture: true,
        }
      },
      categories: true,
      photos: true
    }
  });

  return res.status(200).send({
    status: "success",
    data: offers
  });

};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({
      status: "error",
      data: {},
      message: "Invalid ID."
    });
  }
  
  const offer = await prisma.offer.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      place: true,
      createdAt: true,
      updatedAt: true,
      finished: true,
      author: {
        select: {
          nickname: true,
          profilePicture: true,
        }
      },
      categories: true,
      photos: true
    }
  });

  if (offer === null) {
    return res.status(404).send({
      status: "error",
      data: {},
      message: "Offer with given id does not exists."
    });
  }

  return res.status(200).send({
    status: "success",
    data: offer
  });
};


const offerCreateSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  place: string().required(),
  authorId: number().required(),
  categories: array(number()).required(),
  photos: array(object({
    path: string().required(),
    description: string()
  })).required()
});

export const createOffer = async (req: Request, res: Response) => {
  try {
    const data = await offerCreateSchema.validate(req.body);
    const newOffer = await prisma.offer.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        place: data.place,
        authorId: data.authorId,
        categories: {
          connect : data.categories.map((cat) => {
            return { id: cat};
          })
        },
        photos: {
          createMany: {
            data: data.photos
          }
        }
      }
    });

    return res.status(201).send({
      status: "success",
      data: {},
      message: "Offer was successfully created"
    });
  
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        data: e.errors,
        message: e.message
      });
    } else if (e instanceof PrismaClientKnownRequestError) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: e.message
      });
    } else {
      return res.status(500).send({
        status: "error",
        data: {},
        message: "Internal server error"
      });
    }
  }
};


const offerUpdateSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  place: string().required(),
  finished: boolean().required(),
  categories: array(number()).required(),
  photos: array(object({
    path: string().required(),
    description: string()
  })).required()
});


export const updateOffer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: "Invalid ID."
      });
    }

    const data = await offerUpdateSchema.validate(req.body);

    const updatedOffer = await prisma.offer.update({
      where: {
        id: id
      },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        place: data.place,
        finished: data.finished,
        updatedAt: new Date(),
        categories: {
          set: [],
          connect : data.categories.map((cat) => {
            return { id: cat};
          })
        },
        photos: {
          deleteMany: {
            offerId: id
          },
          createMany: {
            data: data.photos
          }
        }
      }
    });

    return res.status(201).send({
      status: "success",
      data: {},
      message: "Offer was successfully created"
    });
  
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        data: e.errors,
        message: e.message
      });
    } else if (e instanceof PrismaClientKnownRequestError) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: e.message
      });
    } else {
      return res.status(500).send({
        status: "error",
        data: {},
        message: "Internal server error"
      });
    }
  }
};


export const deleteOffer = async(req: Request, res: Response) => {
  const id = Number(req.params.id!);
  if (isNaN(id)) {
    return res.status(400).send({
      status: "error",
      data: {},
      message: "Invalid ID."
    });
  }

  try {
    const deletedOffer = await prisma.offer.delete({
      where: {
        id: id
      }
    });

    return res.status(200).send({
      status: "success",
      data: {},
      message: "Offer was successfully deleted"
    })
  } catch (e) {
    return res.status(400).send({
      status: "error",
      data: {},
      message: "Record with given ID does not exists"
    })
  }
};