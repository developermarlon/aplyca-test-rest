import express from 'express'
import './middlewares/local-strategy'
import './middlewares/jwt-strategy'
import userRouter from './services/user/user.routes'
import morgan from 'morgan';

// Create a new express application instance
const app = express()

// Configure express application
app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// Use routes
app.use('/users', userRouter)

export default app
