<template>
  <div class="card-body p-0" @dblclick="edit()">
    <div class="flex justify-between">
      <div class="card-title p-2 text-sm uppercase">
        {{ props.project.name }}
      </div>
      <div>
        <div class="flex gap-2 mt-2 mr-2.5 cursor-pointer">
          <mdicon
            name="note-outline"
            size="16"
            class="hover:text-slate-100"
            @click="edit()" />
          <mdicon
            name="pencil-outline"
            size="16"
            class="hover:text-slate-100"
            @click="edit()" />
          <mdicon
            name="close-box-outline"
            size="16"
            class="hover:text-slate-100"
            @click="removeProject(project)" />
        </div>
      </div>
    </div>
    <div class="px-2 font-light">
      <span v-html="props.project.description"></span>
    </div>
    <div class="flex justify-between p-2.5">
      <div class="text-xs italic mt-1.5">
        {{ props.project.stage.name }}
      </div>
      <div class="flex justify-end gap-3 mr-2">
        <div class="indicator">
          <label
            :for="`modal-task-${props.project.id}`"
            class="cursor-pointer hover:text-slate-100">
            <span
              class="indicator-item px-1.5 py-2 badge bg-gray-600 text-white badge-xs flex">
              <span>
                {{ props.project.tasks.filter((t: any) => t.completed).length }}
              </span>
              /
              <span>{{ props.project.tasks.length }}</span>
            </span>
            <mdicon name="file-tree" />
          </label>
        </div>
        <div class="indicator">
          <label
            :for="`modal-parts-${props.project.id}`"
            class="cursor-pointer hover:text-slate-100">
            <span
              class="indicator-item px-1.5 py-2 badge bg-gray-600 text-white badge-xs">
              {{ props.project.parts.length }}
            </span>
            <mdicon name="cart" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDocumentStore } from '@/stores'
import type { Project } from '@/models'

const props = defineProps(['project'])
const { set, remove } = useDocumentStore()
const addNewModal = ref()

const edit = () => {
  set(props.project)
  addNewModal.value.checked = true
}

const removeProject = (project: Project) => {
  if (confirm(`Delete ${project.name} project?`)) {
    remove(project)
  }
}

onMounted(() => {
  addNewModal.value = document.getElementById(
    'project-modal'
  ) as HTMLInputElement
})
</script>

<style scoped></style>
