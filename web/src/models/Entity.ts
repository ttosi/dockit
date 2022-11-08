export interface IEntity {
  id: number
  name: string
  created: Date
  create<T>(val: T): T
}

export abstract class Entity implements IEntity {
  constructor(
    public id: number = 0,
    public name: string = '',
    public created = new Date()
  ) {}

  create<T>(val: T): T {
    return Object.assign(this, val)
  }
}
