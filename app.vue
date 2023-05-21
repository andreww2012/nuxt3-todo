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
</script>
