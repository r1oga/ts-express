import { Response, Request, NextFunction } from 'express'
/*
Bug, this do not work
import { get, controller } from './decorators'
*/
import { get, controller, post, use, bodyValidator } from './decorators/index'

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

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body

    if (email === 'hi@com' && password === 'hello') {
      // mark as logged in
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Invalid email or password')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null
    res.redirect('/')
  }
}
