import { defineStore } from 'pinia'
import { Project, Part, Task } from '@/models/Project'
import { Stage } from '@/models/Stage'
import { useStageStore } from '.'
import { getObjectsFromJson } from '@/services/utilService'

export const useProjectStore = defineStore('project', {
  state: () => {
    return {
      project: new Project(),
      projects: [] as Project[],
    }
  },
  actions: {
    async list() {
      const promise = await fetch('http://127.0.0.1:3000/projects')
      const projects = await promise.json()
      this.projects = getObjectsFromJson(Project, projects as Project[]).map(
        (project) => {
          project.parts = getObjectsFromJson(Part, project.parts as Part[])
          project.tasks = getObjectsFromJson(Task, project.tasks as Task[])
          project.stage = new Stage().create(project.stage)
          return project
        }
      )
    },
    async save() {
      if (this.project.id === 0) {
        const stageStore = useStageStore()
        this.project.stage = stageStore.stages.find((s: Stage) => s.id === 1)
        this.projects.push(this.project) // do this after save
      }

      console.log('saving--->', this.project)
    },
    async delete(id: number) {
      console.log('deleting project with id of', id)
    },
  },
})
