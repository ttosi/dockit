import { defineStore } from 'pinia'
import { Stage } from '@/models/Stage'
import { Project, Part, Task } from '@/models/Project'
import { getObjectsFromJson } from '@/services/utilService'

export const useDocumentStore = defineStore('document', {
  state: () => {
    return {
      _id: undefined,
      _rev: undefined,
      user: '',
      stages: [] as Stage[],
      projects: [] as Project[],
    }
  },
  actions: {
    async get() {
      const promise = await fetch('https://tdc.app:3000/document')
      const data = await promise.json()

      this._id = data._id
      this._rev = data._rev
      this.user = 'ttosi519@gmail.com'
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
      console.log(this.projects)
      await fetch('https://tdc.app:3000/document', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: this._id,
          _rev: this._rev,
          user: 'ttosi519@gmail.com',
          projects: this.projects,
          stages: this.stages,
        }),
      }).then((d) => console.log(d))
    },
  },
})
