<template>
  <main class="m-5">
    <div class="lg:flex justify-between gap-3">
      <project-stage
        v-for="stage in stages"
        :stage="stage"
        :projects="projectsByStage(stage)"
        :key="stage.id" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Project, Stage } from '@/models'
import { useDocumentStore } from '@/stores'
import { ProjectStage } from '@/components'

const documentStore = useDocumentStore()
const { stages, projects } = storeToRefs(documentStore)

documentStore.get()

const projectsByStage = (stage: Stage) => {
  return projects.value.filter((p: Project) => p.stage.id === stage.id)
}
</script>
