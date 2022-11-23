<template>
  <header class="sticky flex justify-between p-3 bg-base-300 z-50">
    <div class="flex items-center justify-center gap-3 text-orange-400">
      <mdicon name="view-list" class="pt-0.5" />
      <span class="text-xl font-semibold">Dockit</span>
    </div>
    <div class="flex justify-between items-center gap-2">
      <new-project-button class="mr-1" />
      <project-modal />
      <theme-toggle />
      <mdicon name="cog-outline" size="20" class="mb-1 text-orange-500" />
      <mdicon
        name="logout"
        size="20"
        class="mb-1 text-orange-500"
        @click="authStore.logout()" />
      <span class="text-orange-500 text-sm mb-1">{{ email }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NewProjectButton, ProjectModal, ThemeToggle } from '@/components'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const { email } = storeToRefs(authStore)
</script>

<style scoped></style>
