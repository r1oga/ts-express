import express from 'express'

export const router = express.Router()

export function controller(prefix: string) {
  return (target: Function) => {
    for (let key in target.prototype) {
      const handler = target.prototype[key]
      const path = Reflect.getMetadata('path', target.prototype, key)

      if (path) {
        router.get(`${prefix}${path}`, handler)
      }
    }
  }
}
