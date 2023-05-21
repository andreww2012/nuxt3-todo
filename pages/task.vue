<template>
  <template v-if="task">
    <div class="mt-8 text-neutral-500 overflow-anywhere">
      <nuxt-link :to="{name: 'home'}" class="duration-150 hover:text-white">Главная</nuxt-link> /
      {{ task.title }}
    </div>
    <the-task class="mt-2" :task="task" simple></the-task>
  </template>
</template>

<script setup lang="ts">
import {NuxtLink} from '#components';
import {computed, useAsyncData, useRoute, useSeoMeta} from '#imports';
import TheTask from '~/components/the-task.vue';
import {useTaskStore} from '~/stores/task.store';

const taskStore = useTaskStore();

const route = useRoute();

const taskId = computed(() => String(route.params.taskId));

await useAsyncData(taskId.value, () => taskStore.fetchTaskById(taskId.value));

const task = computed(() => taskStore.getTaskById(taskId.value));

useSeoMeta({
  title: task.value?.title,
  description: task.value?.text,
});
</script>
