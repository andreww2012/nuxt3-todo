// import {z} from 'zod';
import {createZodFetcher} from 'zod-fetch';
import type {Task, TaskData} from '~/types';
import {
  CreateTaskOutput,
  DeleteTaskOutput,
  EditTaskOutput,
  GetAllTasksOutput,
  MarkTaskAsCompletedOutput,
} from './schemas.js';

// TODO env
const BASE_URL = 'https://646790f9ba7110b663bcb0d4.mockapi.io';

const fetchWithZod = createZodFetcher();

export const getAllTasks = () => fetchWithZod(GetAllTasksOutput, `${BASE_URL}/todos`);

export const markTaskAsCompleted = async (taskId: string, completed = true) => {
  const result = await fetch(`${BASE_URL}/todos/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({completed} satisfies Partial<Task>),
  });
  if (result.ok) {
    return MarkTaskAsCompletedOutput.parse(await result.json());
  }
  return null;
};

export const deleteTask = async (taskId: string) => {
  const result = await fetch(`${BASE_URL}/todos/${taskId}`, {
    method: 'DELETE',
  });
  if (result.ok) {
    return DeleteTaskOutput.parse(await result.json());
  }
  return null;
};

export const createTask = async (task: TaskData) => {
  const result = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (result.ok) {
    return CreateTaskOutput.parse(await result.json());
  }
  return null;
};

export const editTask = async (taskId: string, task: TaskData) => {
  const result = await fetch(`${BASE_URL}/todos/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (result.ok) {
    return EditTaskOutput.parse(await result.json());
  }
  return null;
};
