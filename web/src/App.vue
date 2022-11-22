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
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { LoginScreen, SiteHeader, SiteFooter } from '@/components/'
import { useAuthStore } from '@/stores/'

const { cookies } = useCookies()
const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)

onMounted(() => {
  if (cookies.get('token') && cookies.get('user')) {
    authenticated.value = true
  }
})
</script>

<style scoped></style>
