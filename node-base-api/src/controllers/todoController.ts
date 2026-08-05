import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import { Todo } from '@prisma/client';
import { Prisma } from '../generated/prisma/browser';

export const all = async (req: Request, res: Response) => {
    const list = await prisma.todo.findMany()
    res.json({ list })
}

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {

        let newTodo = await prisma.todo.create({
            data: {
                title: req.body.title,
                done: req.body.done ? true : false
            }
        })

        res.status(201).json({ item: newTodo })
    }

    res.json({ error: 'Dados não enviados.'})
}

export const update = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    let todo = await prisma.todo.findFirst({
        where: {
            id: id
        }
    })

    if (todo) {

        if (req.body.title) {
            todo.title = req.body.title
        }

        if (req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true
                    break;
                
                case 'false':
                case '0':
                    todo.done = false
                    break;
            }
        }

        await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: todo.title,
                done: todo.done
            }
        })

        return res.status(200).json({ item: todo})
    } else {

        return res.json({ error: 'item não encontrado'})

    }


}

export const remove = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const result = await prisma.todo.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json({ item: result })
}