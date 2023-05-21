import {z} from 'zod';

export const Task = z.object({
  id: z.string(),
  createdAt: z.string().transform((val) => new Date(val)),
  exp: z.number().min(0),
  title: z.string().min(1),
  text: z.string().min(3),
  completed: z.boolean(),
});

export const GetAllTasksOutput = Task.array();
export const GetTaskOutput = Task;
export const MarkTaskAsCompletedOutput = Task;
export const DeleteTaskOutput = Task;
export const CreateTaskOutput = Task;
export const EditTaskOutput = Task;
