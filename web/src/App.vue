<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="">
    <site-header />
    <div class="relative overflow-y-auto h-[calc(100vh-110px)] w-screen">
      <router-view />
    </div>
    <site-footer />
  </div>
</template>

<style scoped></style>
