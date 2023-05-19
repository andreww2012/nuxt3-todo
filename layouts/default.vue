<template>
  <div
    class="flex h-52 items-center justify-center gap-3 bg-neutral-950 text-4xl font-black text-primary"
  >
    <rocket-icon class="w-[22px]"></rocket-icon>
    <span class="pb-2"
      >Nu<span class="text-secondary">xt</span> to<span class="text-secondary">do</span></span
    >
  </div>
  <div class="mx-auto max-w-screen-md px-3 lg:px-0">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import RocketIcon from '~icons/_/rocket.svg';
</script>
