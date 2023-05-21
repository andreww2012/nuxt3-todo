<template>
  <div class="-translate-y-1/2">
    <button
      class="flex w-full items-center justify-center gap-2 rounded-lg border-none bg-primary-dark p-4 font-bold text-neutral-50 duration-150 hover:bg-primary active:translate-y-0.5"
      @click="openNewTaskModal()"
    >
      <span class="pb-0.5 leading-4">Создать</span>
      <plus-icon class="w-4"></plus-icon>
    </button>
  </div>
  <div class="mt-11 flex justify-between font-bold [&>*]:flex [&>*]:items-center [&>*]:gap-2">
    <div>
      <span class="text-primary">Всего задач</span>
      <span class="badge">{{ allTasksCount }}</span>
    </div>
    <div>
      <span class="text-secondary">Выполнено</span>
      <span class="badge">{{ completedTasksCount }} из {{ allTasksCount }}</span>
    </div>
  </div>
  <div v-if="tasks.length === 0" class="mt-24 flex flex-col items-center gap-4">
    <img src="~/assets/clipboard.png" alt="Task list is empty" />
    <div class="text-center text-neutral-500">
      <div class="font-bold">У Вас еще нет созданных задач</div>
      <div>Создавайте задачи и организуйте свои дела</div>
    </div>
  </div>
  <the-task v-for="task in tasks" v-else :key="task.id" class="mt-3" :task="task"></the-task>
</template>

<script setup lang="ts">
import {computed, toRefs, useAsyncData} from '#imports';
import CreateOrEditTask from '~/components/create-or-edit-task.vue';
import TheTask from '~/components/the-task.vue';
import {useModal} from '~/composables/useModal';
import {useTaskStore} from '~/stores/task.store';
import PlusIcon from '~icons/_/plus.svg';

const store = useTaskStore();

await useAsyncData('user', () => store.getAllTasks());

const {tasks} = toRefs(store);

const allTasksCount = computed<number>(() => tasks.value.length);
const completedTasksCount = computed<number>(
  () => tasks.value.filter((task) => task.completed).length,
);

const {open: openNewTaskModal, close: closeNewTaskModal} = useModal(
  {component: CreateOrEditTask},
  {
    onSuccess: () => closeNewTaskModal(),
  },
  {
    title: 'Создать задачу',
    modalOptions: {
      clickToClose: false,
    },
  },
);
</script>

<style scoped>
.badge {
  @apply rounded-full bg-neutral-700 px-2 py-0.5 text-xs font-bold text-neutral-300;
}
</style>
