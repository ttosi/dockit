import { defineStore } from 'pinia'
import { Stage } from '@/models/Stage'
import { getObjectsFromJson } from '@/services/utilService'

export const useStageStore = defineStore('stage', {
  state: () => {
    return {
      stages: [] as Stage[],
    }
  },
  actions: {
    async list() {
      const promise = await fetch('http://127.0.0.1:3000/stages')
      const stages = await promise.json()
      this.stages = getObjectsFromJson(Stage, stages as Stage[])
    },
  },
})
