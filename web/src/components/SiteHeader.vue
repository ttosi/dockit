<template>
  <header class="sticky flex justify-between p-3 bg-base-300 z-50">
    <div class="flex items-center justify-center gap-3 text-orange-400">
      <mdicon name="view-list" class="pt-0.5" />
      <span class="text-xl font-semibold">Dockit</span>
    </div>
    <div class="flex justify-between items-center gap-5">
      <new-project-button />
      <project-modal />
      <theme-toggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { NewProjectButton, ProjectModal, ThemeToggle } from '@/components'
</script>

<style scoped></style>
