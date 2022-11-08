import express from 'express'
import projects from './api/projects'
import stages from './api/stages'

const app = express()
const port = 3000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/projects', projects)
app.use('/stages', stages)
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
