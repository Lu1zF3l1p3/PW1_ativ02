import { PrismaClient } from '@prisma/client';
import { UserType } from '../models/UserType';

const prisma = new PrismaClient();

interface DataType {
	name: string;
	username: string;
}

export const UserRepository = {
	getAll: async () => {
		const res = await prisma.user.findMany();
		return res;
	},
	getUnique: async (username: string) => {
		const res: UserType | null = await prisma.user.findUnique({
			where: { username: username },
		});
		return res;
	},
	create: async (data: DataType) => {
		const res = await prisma.user.create({
			data: data,
		});
		return res;
	},
};
