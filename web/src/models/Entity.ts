export interface IEntity {
  name: string
  create<T>(val: T): T
}

export abstract class Entity implements IEntity {
  constructor(public name: string = '') {}

  create<T>(val: T): T {
    return Object.assign(this, val)
  }
}
