<template>
  <input type="checkbox" id="project-modal" class="modal-toggle" />
  <label
    for="project-modal"
    class="modal cursor-pointer"
    @keyup.enter="update()">
    <label class="modal-box relative shadow-none">
      <div class="font-normal uppercase text-orange-500 mb-2">
        Add New Project
      </div>
      <div>
        <input
          v-model.lazy="editingProject.name"
          type="text"
          placeholder="Project Name"
          class="input input-bordered w-full border-orange-500 mb-3 text-sm" />
      </div>
      <div>
        <input
          v-model.lazy="editingProject.description"
          class="input input-bordered border-orange-500 w-full resize-none"
          placeholder="Description" />
      </div>
      <div class="flex gap-2 justify-end mt-3">
        <label
          for="project-modal"
          class="btn btn-sm"
          @click="Object.assign(editingProject, project)">
          Cancel
        </label>
        <label for="project-modal" class="btn btn-sm" @click="update()">
          Save
        </label>
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDocumentStore } from '@/stores'
import { storeToRefs } from 'pinia'

const addNewModal = ref()
const documentStore = useDocumentStore()
const { save } = useDocumentStore()
const { project, editingProject } = storeToRefs(documentStore)

const update = async () => {
  await save(Object.assign(project, editingProject))
  addNewModal.value.checked = false
}

onMounted(() => {
  addNewModal.value = document.getElementById(
    'project-modal'
  ) as HTMLInputElement
})
</script>

<style scoped></style>
