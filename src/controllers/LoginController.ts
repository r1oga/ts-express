import { Response, Request } from 'express'
/*
Bug, this do not work
import { get, controller } from './decorators'
*/
import { get, controller } from './decorators/index'

@controller('/auth')
class LoginController {
  @get('/login')
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
