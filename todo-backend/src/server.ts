import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET /todos
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(todos);
});

// POST /todos
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const newTodo = await prisma.todo.create({ data: { text } });
  res.json(newTodo);
});

// PATCH /todos/:id
app.patch('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body; // 이 부분의 의미는 요청 본문에서 completed 필드를 추출하는 것입니다. 이 필드는 할 일의 완료 상태를 나타냅니다.

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" }); // 이 오류는 서버 측에서 발생한 오류를 나타냅니다. 이 오류는 클라이언트에게 전달되어 오류 메시지를 표시할 수 있습니다.
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.todo.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error("DELETE /todos error:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}`);
// });

const port = Number(process.env.PORT) || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
