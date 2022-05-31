import { object, string, number, date, ValidationError, boolean, array } from 'yup';
import prisma from '../client';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const userCreateSchema = object({
  nickname: string().max(32).required(),
  email: string().email().required(),
  password: string().length(64).required()
  //TODO
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await userCreateSchema.validate(req.body);

    if (await isNicknameTaken(data.nickname)) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: "Nickname is taken"
      });
    }

    if (await isEmailTaken(data.email)) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: "Email is taken"
      });
    }

    await prisma.user.create({
      data: {
        ...data,
        description: "",
        profilePicture: ""
      }
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

const userUpdateSchema = object({
  email: string().email(),
  password: string().length(100),
  profilePicture: string(),
  description: string()
  //TODO
});

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const nickname = req.params.nickname!;
    
    if (!(await isNicknameTaken(nickname))) {
      return res.status(400).send({
        status: "error",
        data: {},
        message: "User does not exists"
      });
    }

    const data = await userUpdateSchema.validate(req.body);

    //if (data.email !== undefined && (await isEmailTaken(data.email))) {
    //  return res.status(400).send({
    //    status: "error",
    //    data: {},
    //    message: "Email is taken by other user"
    //  });
    //}

    await prisma.user.update({
      where: {
        nickname: nickname
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return res.status(200).send({
      status: "success",
      data: {},
      message: "User was successfully updated"
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


export const getUser = async (req: Request, res: Response) => {
  const nickname = req.params.nickname!;
  const user = await prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
    select: {
      nickname: true,
      profilePicture: true,
      description: true,
      email: true,
      createdAt: true,
      lastActivity: true,
      offers: {
        select: {
          id: true,
          title: true,
          price: true,
          place: true,
          updatedAt: true,
          finished: true,
          author: {
            select: {
              id: true,
              nickname: true,
              profilePicture: true
            }
          }
        }
      }
    }
  });

  if (user === null) {
    return res.status(404).send({
      status: "error",
      data: {},
      message: "User with given name does not exists."
    });
  }

  return res.status(200).send({
    status: "success",
    data: user
  });
};




const loginSchema = object({
  nickname: string().max(32).required(),
  password: string().length(64).required()
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
        message: "Nickname does not exists"
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


const checkExistenceSchema = object({
  nickname: string(),
  email: string()
});

export const checkExistence = async (req: Request, res: Response) => {
  try {
    const data = await checkExistenceSchema.validate(req.body);
    const user = await prisma.user.findUnique({
      where: data
    });

    return res.status(200).send({
      status: "success",
      data: {
        exists: user !== null
      }
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



const isNicknameTaken = async (nickname: string) => {
  const result = await prisma.user.findUnique({
    where: {
      nickname: nickname
    }
  });
  return result !== null;
};

const isEmailTaken = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  return result !== null;
};