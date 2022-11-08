import express, { Request, Response } from 'express'
import { network } from '../services/network'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const document: any = await network.get(
    'http://76.74.170.197:5984/dockit/088b53bae88c75b1e11defa75e002847'
  )
  res.json(document.stages)
  // const stages = ''
  // res.json([
  //   { id: 1, name: 'New Idea' },
  //   { id: 2, name: 'Thinking About it' },
  //   { id: 3, name: 'Planning it' },
  //   { id: 4, name: 'Working on it' },
  //   { id: 5, name: 'Done with it' },
  //   { id: 6, name: 'Saving for later' },
  // ])
})

export default router
