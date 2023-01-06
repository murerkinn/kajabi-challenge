require('dotenv').config()

import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'

const PORT = process.env.PORT || '4000'
const ENV = process.env.NODE_ENV || 'development'

const app = express()

app.use(
  cors({
    origin: true,
    credentials: Boolean(process.env.HTTP_CORS_CREDENTIALS),
  })
)

app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(hpp())
app.use(helmet())
app.use(compression())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} env ${ENV}`)
})
