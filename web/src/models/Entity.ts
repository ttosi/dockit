export interface IEntity {
  id: number
  name: string
  create<T>(val: T): T
}

export abstract class Entity implements IEntity {
  constructor(public id: number = 0, public name: string = '') {}

  create<T>(val: T): T {
    return Object.assign(this, val)
  }
}
