import { AsyncRouter } from 'express-async-router'
import EmployeeModel from './models/employee'

const router = AsyncRouter()

router.get('/', async req => {
  const where: any = {}
  const pagination = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.per_page) || 10,
  }

  if (req.query.email) {
    where.email = { $regex: new RegExp(req.query.email as string, 'ig') }
  }

  const employees = await EmployeeModel.paginate(where, pagination)

  return employees
})

router.get('/:id', async req => {
  const employee = await EmployeeModel.findById(req.params.id)

  return employee
})

export default router
