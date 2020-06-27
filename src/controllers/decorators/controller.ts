import 'reflect-metadata'
import express from 'express'
import { AppRouter } from '../../AppRouter'

export function controller(prefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance()

    for (let key in target.prototype) {
      const handler = target.prototype[key]
      const path = Reflect.getMetadata('path', target.prototype, key)
      if (path) {
        router.get(`${prefix}${path}`, handler)
      }
    }
  }
}
