import { Entity } from './Entity'
import { Stage } from './Stage'

export class Project extends Entity {
  constructor(
    public id: number = 0,
    public description: string = '',
    public stage = new Stage(),
    public tasks = [] as Task[],
    public parts = [] as Part[],
    public completed: boolean = false
  ) {
    super()
  }
}

export class Part extends Entity {
  constructor(
    public source = '',
    public purchased = false,
    public quantity = 1,
    public cost = 0
  ) {
    super()
  }
}

export class Task extends Entity {
  constructor(public completed: boolean = false) {
    super()
  }
}
