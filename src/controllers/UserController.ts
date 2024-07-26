import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BodyType {
	name: string;
	username: string;
}

export const UserGetAll = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json(await prisma.user.findMany());
};

export const UserPost = async (req: Request, res: Response) => {
	const { name, username } = req.body as BodyType;
	if (!name || !username) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'name e username são obrigatórios!',
		});
		return;
	}
	const userExist = await prisma.user.findUnique({
		where: { username: username },
	});

	if (userExist) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Já existe um usuário com esse username',
		});
		return;
	}
	const newUser = await prisma.user.create({
		data: {
			name,
			username,
		},
	});
	res.status(StatusCodes.CREATED).json(newUser);
};
