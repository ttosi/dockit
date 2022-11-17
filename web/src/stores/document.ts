import { defineStore } from 'pinia'
import { Stage } from '@/models/Stage'
import { Project, Part, Task } from '@/models/Project'
import { getObjectsFromJson } from '@/services/utilService'

export const useDocumentStore = defineStore('document', {
  state: () => {
    return {
      _id: undefined,
      _rev: undefined,
      email: '',
      project: new Project(),
      editingProject: new Project(),
      projects: [] as Project[],
      stages: [] as Stage[],
    }
  },
  actions: {
    set(project: Project) {
      this.project = { ...project } as Project
      this.editingProject = project
    },
    async get() {
      const promise = await fetch('http://localhost:3000/document')
      const data = await promise.json()

      this._id = data._id
      this._rev = data._rev
      this.email = 'ttosi519@gmail.com'
      this.stages = getObjectsFromJson(Stage, data.stages as Stage[])
      this.projects = getObjectsFromJson(
        Project,
        data.projects as Project[]
      ).map((project) => {
        project.parts = getObjectsFromJson(Part, project.parts as Part[])
        project.tasks = getObjectsFromJson(Task, project.tasks as Task[])
        project.stage = new Stage().create(project.stage)
        return project
      })
    },
    async save() {
      if (this.project.id === 0) {
        this.project.id = Math.max(...this.projects.map((p: any) => p.id)) + 1
        if (this.project.id === Number.NEGATIVE_INFINITY) {
          this.project.id = 1
        }
        this.project.stage = this.stages[0]
        this.projects.push(this.project)
      }

      await fetch('http://localhost:3000/document', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: this._id,
          _rev: this._rev,
          type: 'project',
          email: 'ttosi519@gmail.com',
          projects: this.projects,
          stages: this.stages,
        }),
      })
        .then((data: any) => data.json())
        .then((res: any) => (this._rev = res._rev))
    },
    async remove(project: any) {
      this.projects.splice(this.projects.indexOf(project), 1)

      await fetch('http://localhost:3000/document', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: this._id,
          _rev: this._rev,
          email: 'ttosi519@gmail.com',
          projects: this.projects,
          stages: this.stages,
        }),
      })
        .then((data: any) => data.json())
        .then((res: any) => (this._rev = res._rev))
    },
  },
})
