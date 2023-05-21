<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
  <modals-container></modals-container>
</template>

<script lang="ts" setup>
import '~/assets/css/index.css';

import {ModalsContainer} from 'vue-final-modal';
import {NuxtLayout, NuxtPage} from '#components';
import {useHead} from '#imports';

useHead({
  titleTemplate: (titleChunk) => {
    return [titleChunk, 'Nuxt Todo'].filter(Boolean).join(' — ');
  },
});
</script>
