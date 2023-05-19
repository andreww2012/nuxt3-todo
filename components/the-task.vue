<template>
  <div
    class="flex gap-4 rounded-lg border border-neutral-700 bg-neutral-800 px-5 pb-8 pt-5 text-white"
  >
    <div class="shrink-0">
      <button
        class="relative h-5 w-5 rounded-full border-2 duration-150"
        :class="{
          'border-primary bg-transparent hover:bg-primary [&:hover>svg]:text-white':
            !task.completed,
          'border-secondary bg-secondary': task.completed,
        }"
        role="checkbox"
        @click="toggleMarkTaskAsCompleted(task.id)"
      >
        <check-icon
          class="absolute left-1/2 top-1/2 w-2 -translate-x-1/2 -translate-y-1/2"
          :class="{'text-transparent': !task.completed}"
        ></check-icon>
      </button>
    </div>
    <div class="grow">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold" :class="{completed: task.completed}">
          {{ task.title }}
        </h2>
        <div class="flex items-center gap-5">
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
            <button @click="deleteTask(task.id)">
              <trash-icon class="w-3.5 text-neutral-500"></trash-icon>
            </button>
            <button v-if="!task.completed">
              <pen-note-icon class="w-3.5 text-neutral-500"></pen-note-icon>
            </button>
          </div>
        </div>
      </div>
      <p class="mt-2.5" :class="{completed: task.completed}">{{ task.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from '#imports';
import {useTaskStore} from '~/stores/task.store';
import type {PropType, Task} from '~/types';
import CheckIcon from '~icons/_/check.svg';
import PenNoteIcon from '~icons/_/pen-note.svg';
import TrashIcon from '~icons/_/trash.svg';

const props = defineProps({
  task: {type: Object as PropType<Task>, required: true},
});

const {deleteTask, toggleMarkTaskAsCompleted} = useTaskStore();

const dateFormatter = new Intl.DateTimeFormat('ru-RU');

const createdDate = computed(() => props.task.createdAt);
const createdDateFormatted = computed(() => dateFormatter.format(props.task.createdAt));
const createdDateIso = computed(() => createdDate.value.toISOString());

const expirationDate = computed(() => new Date(props.task.exp * 1000));
const expirationDateFormatted = computed(() => dateFormatter.format(expirationDate.value));
const expirationDateIso = computed(() => expirationDate.value.toISOString());
</script>

<style scoped>
.completed {
  @apply text-neutral-500 line-through;
}
</style>
