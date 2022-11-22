import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { Stage } from '@/models/Stage'
import { Project, Part, Task } from '@/models/Project'
import { getObjectsFromJson } from '@/services/utilService'
import { networkService } from '@/services/networkService'

const { cookies } = useCookies()

export const useDocumentStore = defineStore('document', {
  state: () => {
    return {
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
    async list() {
      const data = await networkService.get('/document')

      // console.log(data)
      // console.log(email)

      this.stages = getObjectsFromJson(Stage, data.stages as Stage[])
      this.projects = getObjectsFromJson(
        Project,
        data.projects as Project[]
      ).map((project) => {
        project.stage = new Stage().create(project.stage)
        project.parts = getObjectsFromJson(Part, project.parts as Part[])
        project.tasks = getObjectsFromJson(Task, project.tasks as Task[])
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

      console.log(this.projects)
      console.log(this.stages)

      await networkService.post('/document', {
        email: cookies.get('user'),
        projects: this.projects,
        stages: this.stages,
      })

      // await fetch('http://localhost:3000/document', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     projects: this.projects,
      //     stages: this.stages,
      //   }),
      // })
      //   .then((data: any) => data.json())
      //   .then((res: any) => res)
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
          projects: this.projects,
          stages: this.stages,
        }),
      })
        .then((data: any) => data.json())
        .then((res: any) => res)
    },
  },
})
