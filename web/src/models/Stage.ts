import { Entity } from './Entity'

export class Stage extends Entity {
  constructor(public shortname: string = '') {
    super()
  }
}
