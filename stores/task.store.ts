import {defineStore} from 'pinia';
import {ref} from '#imports';
import * as API from '~/services/api';
import type {Task, TaskData} from '~/types';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);

  const getAllTasks = async () => {
    const response = await API.getAllTasks();
    tasks.value = response;
    return response;
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

  const toggleMarkTaskAsCompleted = async (taskId: string) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const updatedTask = await API.markTaskAsCompleted(taskId, !task.completed);
    replaceTask(updatedTask);
    return updatedTask;
  };

  const deleteTask = async (taskId: string) => {
    const deletedTask = await API.deleteTask(taskId);
    if (deletedTask) {
      const taskPosition = tasks.value.findIndex((t) => t.id === taskId);
      if (taskPosition !== -1) {
        tasks.value.splice(taskPosition, 1);
      }
    }
    return deletedTask;
  };

  const createTask = async (task: TaskData) => {
    const newTask = await API.createTask(task);
    if (newTask) {
      tasks.value.push(newTask);
    }
    return newTask;
  };

  const editTask = async (taskId: string, task: TaskData) => {
    const updatedTask = await API.editTask(taskId, task);
    replaceTask(updatedTask);
    return updatedTask;
  };

  return {
    tasks,
    getAllTasks,
    toggleMarkTaskAsCompleted,
    deleteTask,
    createTask,
    editTask,
  };
});
