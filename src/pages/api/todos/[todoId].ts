import { parse } from "content-type";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma";
import { updateSchema } from "../../../schemas/Todo";

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  const contentType = parse(req);
  if (contentType.type !== "application/json") {
    res.status(415).json({
      message: "Content type not allowed, only 'application/json' is supported",
    });
    return;
  }

  const { todoId } = req.query;
  if (!todoId) {
    res.status(400).json({ message: "todoId not included" });
    return;
  }
  if (Array.isArray(todoId)) {
    res.status(400).json({ message: "todoId cannot be an array" });
    return;
  }
  const body = req.body;
  if (!body) {
    res
      .status(400)
      .json({ message: "Request body was not provided or was malformed" });
    return;
  }

  const value = updateSchema.safeParse(req.body);
  if (!value.success) {
    res.status(400).json({ message: value.error.message });
    return;
  }

  const todoById = await prisma.todo.findFirst({
    where: {
      id: todoId,
    },
  });
  if (!todoById) {
    res
      .status(404)
      .json({ message: `Unable to find a todo with ID: ${todoId}` });
    return;
  }

  await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: value.data,
  });

  res.status(204).end();
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  const { todoId } = req.query;
  if (!todoId) {
    res.status(400).json({ message: "todoId not included" });
    return;
  }
  if (Array.isArray(todoId)) {
    res.status(400).json({ message: "todoId cannot be an array" });
    return;
  }

  const todoById = await prisma.todo.findFirst({
    where: {
      id: todoId,
    },
  });
  if (!todoById) {
    res
      .status(404)
      .json({ message: `Unable to find a todo with ID: ${todoId}` });
    return;
  }

  await prisma.todo.delete({ where: { id: todoId } });

  res.status(204).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    return handlePUT(req, res);
  }
  if (req.method === "DELETE") {
    return handleDELETE(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
}
