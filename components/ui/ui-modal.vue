<template>
  <vue-final-modal
    class="flex items-center justify-center"
    content-class="flex flex-col w-[456px] max-w-[456px] p-5 bg-neutral-700 rounded rounded-lg"
    v-bind="modalOptions"
  >
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-xl font-bold text-white">{{ title }}</h1>
      <button class="relative h-6 w-6 rounded bg-danger" @click="emit('close')">
        <times-icon class="center-absolutely w-3"></times-icon>
      </button>
    </div>
    <slot></slot>
  </vue-final-modal>
</template>

<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal';
import type {PropType} from '~/types';
import TimesIcon from '~icons/_/times.svg';

defineProps({
  title: {type: String, required: true},
  modalOptions: {
    type: Object as PropType<InstanceType<typeof VueFinalModal>['$props']>,
    required: false,
  },
});

const emit = defineEmits<{
  close: [];
}>();
</script>
