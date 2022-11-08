<template>
  <label for="project-modal">
    <button
      class="btn btn-sm bg-orange-500 border-none text-base-300 font-semibold hover:bg-orange-500"
      @click="addNewProject">
      Add New
      <div class="ml-2 hidden md:flex gap-0.5 font-extralight text-orange-500">
        <kbd class="text-xs kbd kbd-sm">ctrl</kbd>
        <kbd class="text-xs kbd kbd-sm">shift</kbd>
        <kbd class="text-xs kbd kbd-sm">Z</kbd>
      </div>
    </button>
  </label>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useProjectStore } from '@/stores'
import { Project } from '@/models/Project'

const projectStore = useProjectStore()
const addNewModal = ref()
const keys = useMagicKeys()
const addProject = keys['Ctrl+Shift+Z']

const addNewProject = () => {
  projectStore.project = new Project()
  addNewModal.value.checked = true
}

watch(addProject, (v) => {
  if (v) {
    addNewProject()
  }
})

onMounted(() => {
  addNewModal.value = document.getElementById(
    'project-modal'
  ) as HTMLInputElement
})
</script>

<style scoped></style>
