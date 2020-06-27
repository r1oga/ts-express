import 'reflect-metadata'

// returns a decorator factory
const routeBinder = (method: string) => (path: string) => (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  Reflect.defineMetadata('path', path, target, key)
  Reflect.defineMetadata('method', method, target, key)
}

export const get = routeBinder('get')
export const put = routeBinder('put')
export const post = routeBinder('post')
export const del = routeBinder('del')
export const patch = routeBinder('patch')
