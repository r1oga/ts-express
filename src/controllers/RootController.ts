import { get, controller, use } from './decorators/index'

import { Response, Request, NextFunction } from 'express'

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Not permitted. Use must be logged in')
}

// no slash otherwise routes would be '//'
@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`
          <div>
            <h1>Home</h1>
            <a href='/auth/logout'>Log Out</a>
          </div>
      `)
    } else {
      res.send(`
        <div>
          <h1>Home</h1>
          <div class=''>Not logged in</div>
          <a href='/auth/login'>Login</a>
        </div>
      `)
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Secret page')
  }
}
