import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/UserRepository';

interface BodyType {
	name: string;
	username: string;
}

export const UserGetAll = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json(await UserRepository.getAll());
};

export const UserPost = async (req: Request, res: Response) => {
	const { name, username } = req.body as BodyType;
	if (!name || !username) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'name e username são obrigatórios!',
		});
		return;
	}
	const userExist = await UserRepository.getUnique(username);

	if (userExist != null) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'Já existe um usuário com esse username',
		});
		return;
	}
	const newUser = await UserRepository.create({
		name,
		username,
	});
	res.status(StatusCodes.CREATED).json(newUser);
};
