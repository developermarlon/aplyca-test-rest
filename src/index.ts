import dotenv from 'dotenv'
import app from './app'

// Load environment variables from .env file
dotenv.config({ path: `${String(process.env.NODE_ENV)}.env` })

app.get('/',
  (req, res) => {
    res.send('Welcome to the API 1.0.0')
  }
)

// Create a new server
export default app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${String(process.env.PORT)}`)
})
