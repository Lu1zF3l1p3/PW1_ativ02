import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

interface userType {
	id: string;
	name: string;
	username: string;
}

interface BodyType {
	title: string;
	deadline: string;
	user: userType;
}

export const TechnologyGet = async (req: Request, res: Response) => {
	const { user } = req.body as BodyType;
	res.status(StatusCodes.OK).json(
		await prisma.technology.findMany({
			where: { userId: user.id },
		})
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

	const newTechnology = await prisma.technology.create({
		data: {
			title,
			deadline: new Date(deadline),
			userId: user.id,
		},
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
		let finded = await prisma.technology.update({
			data: {
				title,
				deadline: new Date(deadline),
				userId: user.id,
			},
			where: { id: id },
		});
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
		let finded = await prisma.technology.update({
			data: {
				studied: true,
			},
			where: { id: id },
		});
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
		await prisma.technology.delete({
			where: { id: id },
		});
		res.status(StatusCodes.OK).json(await prisma.technology.findMany());
	} catch (err) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'Nenhuma tecnologia encontrada com o id: ' + id,
		});
	}
};
