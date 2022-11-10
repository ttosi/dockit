<template>
  <div class="card-body p-0">
    <div
      class="card-title p-2 pb-0 bg-base-300 text-sm font-semibold uppercase flex justify-between">
      {{ props.project.name }}
      <div class="flex gap-2 align-top font-extralight cursor-pointer">
        <mdicon
          name="pencil-outline"
          size="16"
          class="hover:text-slate-100"
          @click="editProject" />
        <mdicon
          name="close-box-outline"
          size="16"
          class="hover:text-slate-100"
          @click="deleteProject(props.project.id)" />
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
            <span class="indicator-item p-1 py-1.5 badge badge-accent badge-xs">
              {{ props.project.tasks.length }}
            </span>
            <mdicon name="file-tree" />
          </label>
        </div>
        <div class="indicator">
          <label
            :for="`modal-parts-${props.project.id}`"
            class="cursor-pointer hover:text-slate-100">
            <span class="indicator-item p-1 py-1.5 badge badge-accent badge-xs">
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
// import { useProjectStore } from '@/stores'

const props = defineProps(['project'])
// const projectStore = useProjectStore()
const addNewModal = ref()

const editProject = () => {
  // projectStore.project = props.project
  addNewModal.value.checked = true
}

const deleteProject = (id: number) => {
  // projectStore.delete(id)
}

onMounted(() => {
  addNewModal.value = document.getElementById(
    'project-modal'
  ) as HTMLInputElement
})
</script>

<style scoped></style>
