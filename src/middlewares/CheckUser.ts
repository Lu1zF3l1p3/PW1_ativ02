import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const checkExistsUserAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username } = req.headers as { username: string };

	if (!username) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'username é obrigatório no header!',
		});
		return;
	}
	const userExist = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!userExist) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'Usuário ' + username + ' não encontrado!',
		});
		return;
	}
	req.body.user = userExist;
	next();
};
