-- CreateTable
CREATE TABLE "tasks" (
    "task_id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "task_desc" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);
