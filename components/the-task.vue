<template>
  <div
    class="relative flex gap-4 rounded-lg border border-neutral-700 bg-neutral-800 text-white"
    :class="simple ? 'p-2.5' : 'cursor-pointer px-5 pb-8 pt-5'"
    tabindex="0"
    v-bind="$attrs"
    @click="openTaskPage()"
    @keyup.enter="openTaskPage()"
  >
    <div
      v-if="isLoading"
      class="absolute bottom-0 left-0 right-0 top-0 z-10 cursor-not-allowed bg-white/20"
    ></div>

    <div v-if="!simple" class="shrink-0">
      <button
        class="relative h-5 w-5 rounded-full border-2 duration-150"
        :class="{
          'border-primary bg-transparent hover:bg-primary [&:hover>svg]:text-white':
            !task.completed,
          'border-secondary bg-secondary': task.completed,
        }"
        type="button"
        role="checkbox"
        @click.stop="toggleMarkTaskAsCompleted()"
      >
        <check-icon
          class="center-absolutely w-2"
          :class="{'text-transparent': !task.completed}"
        ></check-icon>
      </button>
    </div>

    <div class="grow">
      <div class="flex flex-col justify-between gap-3 md:flex-row">
        <h2
          class="text-xl font-bold overflow-anywhere md:text-3xl"
          :class="{completed: task.completed}"
        >
          <template v-if="simple">{{ task.title }}</template>
          <nuxt-link v-else :to="taskLocation" class="duration-150 hover:text-primary">{{
            task.title
          }}</nuxt-link>
        </h2>
        <div v-if="!simple">
          <div class="flex items-center justify-between gap-4">
            <dates-block v-if="!simple"></dates-block>
            <div class="flex gap-1">
              <button class="action-button" type="button" @click.stop="deleteTask()">
                <trash-icon class="center-absolutely w-3.5"></trash-icon>
              </button>
              <button
                v-if="!task.completed"
                class="action-button"
                type="button"
                @click.stop="openEditTaskModal()"
              >
                <pen-note-icon class="center-absolutely w-3.5"></pen-note-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-2.5 text-sm overflow-anywhere md:text-base" :class="{completed: task.completed}">
        {{ task.text }}
      </p>
    </div>
  </div>
  <dates-block v-if="simple"></dates-block>
</template>

<script setup lang="tsx">
import {NuxtLink} from '#components';
import {computed, ref, useRouter} from '#imports';
import {RouteLocationRaw} from '#vue-router';
import CreateOrEditTask from '~/components/create-or-edit-task.vue';
import {useModal} from '~/composables/useModal';
import {useTaskStore} from '~/stores/task.store';
import type {PropType, Task} from '~/types';
import CheckIcon from '~icons/_/check.svg';
import PenNoteIcon from '~icons/_/pen-note.svg';
import TrashIcon from '~icons/_/trash.svg';

const props = defineProps({
  task: {type: Object as PropType<Task>, required: true},
  simple: {type: Boolean, required: false},
});

const router = useRouter();
const taskStore = useTaskStore();

const taskLocation = computed<RouteLocationRaw>(() => ({
  name: 'task',
  params: {taskId: props.task.id},
}));
const openTaskPage = () => {
  if (props.simple) {
    return;
  }
  const currSelection = document.getSelection();
  if (currSelection?.type === 'Range') {
    return;
  }
  router.push(taskLocation.value);
};

const isLoading = ref(false);

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

const DatesBlock = () => (
  <div class="inline-grid grid-cols-[auto_auto] gap-x-0.5 text-xs text-neutral-500">
    <span class="whitespace-nowrap">Дата создания:</span>
    <time class="text-primary" datetime={createdDateIso.value} title={createdDateIso.value}>
      {createdDateFormatted.value}
    </time>
    <span class="whitespace-nowrap">Дата окончания:</span>
    <time class="text-primary" datetime={expirationDateIso.value} title={expirationDateIso.value}>
      {expirationDateFormatted.value}
    </time>
  </div>
);

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

.action-button {
  @apply relative h-6 w-6 text-neutral-500 duration-150 hover:text-neutral-300;
}
</style>
