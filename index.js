import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const client = new PrismaClient();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the Tasks API");
});

app.get("/tasks", async (_req, res) => {
  try {
    const taskall = await client.tasks.findMany();
    res.status(201).json(taskall);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await client.tasks.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const specificTask = await client.tasks.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(specificTask);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const removeTask = await client.tasks.delete({
      where: {
        id,
      },
    });

    res.status(200).json(removeTask);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const updateTask = await client.tasks.update({
      where: {
        id,
      },
      data: {
        title: title && title,
        description: description && description,
      },
    });

    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

let port;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 5000;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
