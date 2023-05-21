<template>
  <div
    class="relative flex gap-4 rounded-lg border border-neutral-700 bg-neutral-800 px-5 pb-8 pt-5 text-white"
  >
    <div
      v-if="isLoading"
      class="absolute bottom-0 left-0 right-0 top-0 z-10 cursor-not-allowed bg-white/20"
    ></div>
    <div class="shrink-0">
      <button
        class="relative h-5 w-5 rounded-full border-2 duration-150"
        :class="{
          'border-primary bg-transparent hover:bg-primary [&:hover>svg]:text-white':
            !task.completed,
          'border-secondary bg-secondary': task.completed,
        }"
        role="checkbox"
        @click="toggleMarkTaskAsCompleted()"
      >
        <check-icon
          class="center-absolutely w-2"
          :class="{'text-transparent': !task.completed}"
        ></check-icon>
      </button>
    </div>
    <div class="grow">
      <div class="flex flex-col justify-between md:flex-row md:items-center">
        <h2 class="text-xl font-bold md:text-3xl" :class="{completed: task.completed}">
          {{ task.title }}
        </h2>
        <div class="flex items-center justify-between gap-5">
          <div class="inline-grid grid-cols-[auto_auto] gap-x-0.5 text-xs text-neutral-500">
            <span>Дата создания:</span>
            <time class="text-primary" :datetime="createdDateIso" :title="createdDateIso">{{
              createdDateFormatted
            }}</time>
            <span>Дата окончания:</span>
            <time class="text-primary" :datetime="expirationDateIso" :title="expirationDateIso">{{
              expirationDateFormatted
            }}</time>
          </div>
          <div class="flex gap-3.5">
            <button @click="deleteTask()">
              <trash-icon class="w-3.5 text-neutral-500"></trash-icon>
            </button>
            <button v-if="!task.completed" @click="openEditTaskModal()">
              <pen-note-icon class="w-3.5 text-neutral-500"></pen-note-icon>
            </button>
          </div>
        </div>
      </div>
      <p class="mt-2.5 text-sm md:text-base" :class="{completed: task.completed}">
        {{ task.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from '#imports';
import CreateOrEditTask from '~/components/create-or-edit-task.vue';
import {useModal} from '~/composables/useModal';
import {useTaskStore} from '~/stores/task.store';
import type {PropType, Task} from '~/types';
import CheckIcon from '~icons/_/check.svg';
import PenNoteIcon from '~icons/_/pen-note.svg';
import TrashIcon from '~icons/_/trash.svg';

const props = defineProps({
  task: {type: Object as PropType<Task>, required: true},
});

const isLoading = ref(false);

const taskStore = useTaskStore();

const deleteTask = async () => {
  isLoading.value = true;
  await taskStore.deleteTask(props.task.id).finally(() => {
    isLoading.value = false;
  });
};

const toggleMarkTaskAsCompleted = async () => {
  isLoading.value = true;
  await taskStore.toggleMarkTaskAsCompleted(props.task.id).finally(() => {
    isLoading.value = false;
  });
};

const dateFormatter = new Intl.DateTimeFormat('ru-RU');

const createdDate = computed(() => props.task.createdAt);
const createdDateFormatted = computed(() => dateFormatter.format(props.task.createdAt));
const createdDateIso = computed(() => createdDate.value.toISOString());

const expirationDate = computed(() => new Date(props.task.exp * 1000));
const expirationDateFormatted = computed(() => dateFormatter.format(expirationDate.value));
const expirationDateIso = computed(() => expirationDate.value.toISOString());

const {open: openEditTaskModal, close: closeEditTaskModal} = useModal(
  {component: CreateOrEditTask},
  {
    taskToEdit: props.task,
    onSuccess: () => closeEditTaskModal(),
  },
  {
    title: 'Редактирование задачи',
    modalOptions: {
      clickToClose: false,
    },
  },
);
</script>

<style scoped>
.completed {
  @apply text-neutral-500 line-through;
}
</style>
