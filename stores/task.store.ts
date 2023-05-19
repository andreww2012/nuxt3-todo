import {defineStore} from 'pinia';
import {ref} from '#imports';
import * as API from '~/services/api';
import type {Task} from '~/types';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);

  const getAllTasks = async () => {
    const response = await API.getAllTasks();
    tasks.value = response;
    return response;
  };

  const toggleMarkTaskAsCompleted = async (taskId: string) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const updatedTask = await API.markTaskAsCompleted(taskId, !task.completed);
    if (updatedTask) {
      const taskPosition = tasks.value.findIndex((t) => t.id === taskId);
      if (taskPosition !== -1) {
        tasks.value.splice(taskPosition, 1, updatedTask);
      }
    }
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

  return {
    tasks,
    getAllTasks,
    toggleMarkTaskAsCompleted,
    deleteTask,
  };
});
