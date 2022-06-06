import { object, string, number, date, ValidationError, boolean, array } from 'yup';
import prisma from '../client';
import { Request, Response } from 'express';

export const list = async (req: Request, res: Response) => {
  const data = await prisma.category.findMany();
  return res.status(200).send({
    status: "success",
    data: data
  });
}

export const get = async (req: Request, res: Response) => {
  const id = Number(req.params.id!);

  const data = await prisma.category.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      offers: {
        where: {
          finished: false
        },
        select: {
          id: true,
          title: true,
          price: true,
          place: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          finished: true,
          author: {
            select: {
              id: true,
              nickname: true,
              profilePicture: true
            }
          },
          photos: true
        }
      }
    }
  });

  if (data === null) {
    return res.status(404).send({
      status: "error",
      data: {},
      message: "Category does not exists"
    })
  }

  return res.status(200).send({
    status: "success",  
    data: data
  });
};