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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Project, Stage } from '@/models'
import { useProjectStore, useStageStore } from '@/stores'
import { ProjectStage } from '@/components'

const projectStore = useProjectStore()
const stageStore = useStageStore()

const { stages } = storeToRefs(stageStore)
const { projects } = storeToRefs(projectStore)

stageStore.list()
projectStore.list()

const projectsByStage = (stage: Stage) => {
  return projects.value.filter((p: Project) => p.stage.id === stage.id)
}

onMounted(() => {})
</script>
