<template>
  <div v-if="!authenticated">
    <login-screen />
  </div>
  <div v-else>
    <site-header />
    <div class="relative overflow-y-auto h-[calc(100vh-110px)] w-screen">
      <router-view />
    </div>
    <site-footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LoginScreen, SiteHeader, SiteFooter } from '@/components/'
import { useAuthStore } from '@/stores/'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)
</script>

<style scoped></style>
