import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DataType {
	title: string;
	deadline: Date;
	userId: string;
}

export const TechnologyRepository = {
	getAll: async () => {
		const res = await prisma.technology.findMany();
		return res;
	},
	getByUserId: async (id: string) => {
		const res = await prisma.technology.findMany({
			where: { userId: id },
		});
		return res;
	},
	create: async (data: DataType) => {
		const res = await prisma.technology.create({
			data: data,
		});
		return res;
	},
	putById: async (data: DataType, id: string) => {
		const res = await prisma.technology.update({
			data: data,
			where: { id: id },
		});
		return res;
	},
	patchStudied: async (id: string) => {
		const res = await prisma.technology.update({
			data: {
				studied: true,
			},
			where: { id: id },
		});
		return res;
	},
	deleteById: async (id: string) => {
		const res = await prisma.technology.delete({
			where: { id: id },
		});
		return res;
	},
};
