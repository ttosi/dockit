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
import { storeToRefs } from 'pinia'
import { SiteHeader, SiteFooter, LoginScreen } from '@/components/'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)
</script>

<style scoped></style>
