<template>
  <div>
    <site-header />
    <div class="relative overflow-y-auto h-[calc(100vh-110px)] w-screen">
      <router-view />
    </div>
    <site-footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SiteHeader, SiteFooter } from '@/components/'
</script>

<style scoped></style>
