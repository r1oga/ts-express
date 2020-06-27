import { Response, Request, NextFunction } from 'express'
/*
Bug, this do not work
import { get, controller } from './decorators'
*/
import { get, controller, use } from './decorators/index'

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('request was made')
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method='POST'>
      <div>
        <label>Email</label>
        <input name='email' />
      </div>
      <div>
        <label>Password</label>
        <input name='password' type='password' />
      </div>
      <button>Submit</button>
  </form>
  `)
  }
}
