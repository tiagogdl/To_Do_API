import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

export const all = async (req: Request, res: Response) => {
    const list = await prisma.todo.findMany()
    res.json({ list })
}

export const add = async () => {
    
}

export const update = async () => {
    
}

export const remove = async () => {
    
}