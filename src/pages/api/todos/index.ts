import { parse } from "content-type";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma";
import { createSchema } from "../../../schemas/Todo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const contentType = parse(req);
  if (contentType.type !== "application/json") {
    res.status(415).json({
      message: "Content type not allowed, only 'application/json' is supported",
    });
    return;
  }

  const value = createSchema.safeParse(req.body);
  if (!value.success) {
    res.status(400).json({ message: value.error.message });
    return;
  }

  const newTodo = await prisma.todo.create({
    data: { ...value.data, completed: false },
  });

  res.status(201).json(newTodo);
}
