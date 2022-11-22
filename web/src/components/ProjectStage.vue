<template>
  <div class="w-full">
    <div class="uppercase text-center p-2 text-base-100 bg-orange-500">
      {{ stage.name }}
    </div>
    <div class="border border-t-0 p-1 border-orange-500">
      <span v-for="project in projects" :key="project.id">
        <task-list :id="project.id" />
        <parts-list :id="project.id" />
      </span>
      <draggable
        :list="projects"
        item-key="name"
        class="list-group"
        group="stages"
        @change="dragend(props.stage, $event)">
        <template #item="{ element }">
          <div>
            <div class="card bg-base-300 m-1.5 rounded-md cursor-move">
              <project-card v-if="projects.length > 0" :project="element" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useDocumentStore } from '@/stores'
import { ProjectCard, PartsList, TaskList } from '@/components'
import type { Project } from '@/models'

const props = defineProps(['stage', 'projects'])
const { save } = useDocumentStore()

const dragend = (stage: any, data: any) => {
  if (data['added']) {
    const project = props.projects.find(
      (p: Project) => p.id === data['added']['element'].id
    )
    project.stage = stage
    useDocumentStore().project = project
    save()
  }
}
</script>

<style scoped>
.list-group:empty {
  padding: 1rem;
  text-align: center;
}

.list-group:empty:before {
  content: 'Drag Project Here';
}
</style>
