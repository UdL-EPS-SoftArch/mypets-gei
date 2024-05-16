import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client'

@HateoasResource('shelters')
export class Shelter extends Resource {
  uri?: string
  name: string
  email: string
  mobile: string
  createdAt: Date = new Date()
  updatedAt: Date = new Date()
  isActive: boolean = true
  rating: number = 0
  locatedAt: any

  constructor(values: object = {}) {
    super()
    Object.assign(this as any, values)
  }
}
