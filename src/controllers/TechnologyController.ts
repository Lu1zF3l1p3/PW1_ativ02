import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserType } from '../models/UserType';
import { TechnologyRepository } from '../repositories/TechnologyRepository';

interface BodyType {
	title: string;
	deadline: string;
	user: UserType;
}

export const TechnologyGet = async (req: Request, res: Response) => {
	const { user } = req.body as BodyType;
	res.status(StatusCodes.OK).json(
		await TechnologyRepository.getByUserId(user.id)
	);
};

export const TechnologyPost = async (req: Request, res: Response) => {
	const { title, deadline, user } = req.body as BodyType;

	if (!title || !deadline) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'title e deadline são obrigatórios!',
		});
		return;
	}

	const newTechnology = await TechnologyRepository.create({
		title,
		deadline: new Date(deadline),
		userId: user.id,
	});
	res.status(StatusCodes.CREATED).json(newTechnology);
};

export const TechnologyPut = async (req: Request, res: Response) => {
	const { title, deadline, user } = req.body as BodyType;
	const { id } = req.params as { id: string };

	if (!title || !deadline) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'title e deadline são obrigatórios!',
		});
		return;
	}

	if (!id) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'id é obrigatório pela url!',
		});
		return;
	}

	// let finded: boolean = false;
	// user.technologies.map((technology) => {
	// 	if (technology.id === id) {
	// 		technology.title = title;
	// 		technology.deadline = new Date(deadline);
	// 		finded = true;
	// 		res.status(StatusCodes.OK).json(technology);
	// 		return;
	// 	}
	// });

	try {
		let finded = await TechnologyRepository.putById(
			{
				title,
				deadline: new Date(deadline),
				userId: user.id,
			},
			id
		);
		res.status(StatusCodes.OK).json(finded);
	} catch (err) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'Nenhuma tecnologia encontrada com o id: ' + id,
		});
	}
};

export const TechnologyPatch = async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };

	if (!id) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'id é obrigatório pela url!',
		});
		return;
	}

	// let finded: boolean = false;
	// user.technologies.map((technology) => {
	// 	if (technology.id === id) {
	// 		technology.studied = true;
	// 		finded = true;
	// 		res.status(StatusCodes.OK).json(technology);
	// 		return;
	// 	}
	// });

	try {
		let finded = await TechnologyRepository.patchStudied(id);
		res.status(StatusCodes.OK).json(finded);
	} catch (err) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'Nenhuma tecnologia encontrada com o id: ' + id,
		});
	}
};

export const TechnologyDelete = async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };

	if (!id) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: 'id é obrigatório pela url!',
		});
		return;
	}

	// let removed: boolean = false;
	// user.technologies = user.technologies.filter((technology) => {
	// 	if (technology.id === id) {
	// 		removed = true;
	// 		return;
	// 	}
	// 	return technology;
	// });

	try {
		await TechnologyRepository.deleteById(id);
		res.status(StatusCodes.OK).json(await TechnologyRepository.getAll());
	} catch (err) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'Nenhuma tecnologia encontrada com o id: ' + id,
		});
	}
};
