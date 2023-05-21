import {defineStore} from 'pinia';
import {ref} from '#imports';
import * as API from '~/services/api';
import type {Task, TaskData} from '~/types';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);
  const tasksFetched = ref(false);

  const getTaskById = (taskId: string): Task | null =>
    tasks.value.find((task) => task.id === taskId) ?? null;

  const fetchAllTasks = async (): Promise<Task[]> => {
    if (tasksFetched.value) {
      return tasks.value;
    }
    const fetchedTasks = await API.getAllTasks();
    tasksFetched.value = true;
    tasks.value = fetchedTasks;
    return fetchedTasks;
  };

  const fetchTaskById = async (taskId: string): Promise<Task> => {
    const existingTask = getTaskById(taskId);
    if (existingTask) {
      return existingTask;
    }
    const fetchedTask = await API.getTaskById(taskId);
    tasks.value.push(fetchedTask);
    return fetchedTask;
  };

  const replaceTask = (task?: Task | null) => {
    if (!task) {
      return;
    }
    const taskPosition = tasks.value.findIndex((t) => t.id === task.id);
    if (taskPosition !== -1) {
      tasks.value.splice(taskPosition, 1, task);
    }
  };

  const toggleMarkTaskAsCompleted = async (taskId: string): Promise<Task | null> => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const updatedTask = await API.markTaskAsCompleted(taskId, !task.completed);
    replaceTask(updatedTask);
    return updatedTask;
  };

  const deleteTask = async (taskId: string): Promise<Task | null> => {
    const deletedTask = await API.deleteTask(taskId);
    if (deletedTask) {
      const taskPosition = tasks.value.findIndex((t) => t.id === taskId);
      if (taskPosition !== -1) {
        tasks.value.splice(taskPosition, 1);
      }
    }
    return deletedTask;
  };

  const createTask = async (task: TaskData): Promise<Task | null> => {
    const newTask = await API.createTask(task);
    if (newTask) {
      tasks.value.push(newTask);
    }
    return newTask;
  };

  const editTask = async (taskId: string, task: TaskData): Promise<Task | null> => {
    const updatedTask = await API.editTask(taskId, task);
    replaceTask(updatedTask);
    return updatedTask;
  };

  return {
    tasks,
    getTaskById,

    fetchAllTasks,
    fetchTaskById,
    toggleMarkTaskAsCompleted,
    deleteTask,
    createTask,
    editTask,
  };
});
