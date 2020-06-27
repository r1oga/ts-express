import { Response, Request, Router, NextFunction } from 'express'

interface ReqWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Not permitted')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
        <div>
          <h1>Home</h1>
          <a href='/logout'>Log Out</a>
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
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = null
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Secret page')
})

export { router }
