<template>
  <div>
    <div
      class="flex h-52 items-center justify-center gap-3 bg-neutral-950 text-4xl font-black text-primary"
    >
      <rocket-icon class="w-[22px]"></rocket-icon>
      <span class="pb-2"
        >Nu<span class="text-secondary">xt</span> to<span class="text-secondary">do</span></span
      >
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import RocketIcon from '~/assets/icons/rocket.svg';
</script>
