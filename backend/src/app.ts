require('dotenv').config()

import axios from 'axios'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'

import EmployeeModel from './domains/employee/models/employee'
import { connectToMongoDB } from './lib/mongo'

const PORT = process.env.PORT || '4000'
const ENV = process.env.NODE_ENV || 'development'

connectToMongoDB()

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

app.use('/employees', require('./domains/employee/router').default)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} env ${ENV}`)

  if (process.env.FETCH_USER_DATA === 'true') {
    console.log('Fetching user data from ReqRes API')

    const { data } = await axios.get('https://reqres.in/api/users')

    const users = data.data

    for (const user of users) {
      console.log(`Creating employee with email "${user.email}"`)

      await EmployeeModel.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
      })

      console.log(`Successfully created employee with email "${user.email}"`)
    }
  }
})
