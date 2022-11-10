<template>
  <input type="checkbox" id="project-modal" class="modal-toggle" />
  <!-- <label for="project-modal" class="modal cursor-pointer">
    <label class="modal-box relative shadow-none">
      <div class="font-normal uppercase text-orange-500 mb-2">
        Add New Project
      </div>
      <div>
        <input
          v-model="projectStore.project.name"
          type="text"
          placeholder="Project Name"
          class="input input-bordered w-full border-orange-500 mb-3 text-sm" />
      </div>
      <div>
        <textarea
          v-model="projectStore.project.description"
          class="textarea border border-orange-500 w-full resize-none"
          placeholder="Description"></textarea>
      </div>
      <div class="flex gap-2 justify-end mt-1">
        <label for="project-modal" class="btn btn-sm">Cancel</label>
        <label
          for="project-modal"
          class="btn btn-sm"
          @click="projectStore.save()">
          Save
        </label>
      </div>
    </label>
  </label> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { useProjectStore } from '@/stores'

const addNewModal = ref()
// const projectStore = useProjectStore()

// const saveProject = () => {
//   projectStore.save()
// }

onMounted(() => {
  addNewModal.value = document.getElementById(
    'project-modal'
  ) as HTMLInputElement
})
</script>

<style scoped>
.active {
  @apply bg-orange-500 text-white border-none;
}
</style>
