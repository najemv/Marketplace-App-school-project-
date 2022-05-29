import { object, string, number, date, ValidationError, boolean, array } from 'yup';
import prisma from '../client';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const userCreateSchema = object({
  nickname: string().length(100).required(),
  email: string().email().required(),
  password: string().length(100).required()
  //TODO
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await userCreateSchema.validate(req.body);
    await prisma.user.create({
      data: data
    });

    return res.status(201).send({
      status: "success",
      data: {},
      message: "User was successfully created"
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
  };
};





const loginSchema = object({
  nickname: string().length(100).required(),
  password: string().length(100).required()
});

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginSchema.validate(req.body);
    
    const user = await prisma.user.findUnique({
      where: {
        nickname: data.nickname
      }
    });

    if (user === null) {
      return res.status(404).send({
        status: "error",
        data: {},
        message: "User does not exists"
      });
    }

    if (user.password != data.password) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: "Wrong password"
      });
    }

    return res.status(200).send({
      status: "success",
      data: {},
      message: "Validation OK"
    });

  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        data: e.errors,
        message: e.message
      });
    }

    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    });
  }
};