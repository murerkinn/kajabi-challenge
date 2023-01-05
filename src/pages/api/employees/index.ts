import { omit } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ReqResAPI } from '@/lib/api'
import { Employee } from '@/modules/employee/types'

type Data =
  | {
      page: number
      per_page: number
      total: number
      total_pages: number
      data: Employee[]
    }
  | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const page = Number(req.query.page || 1)
  const per_page = Number(req.query.per_page || 6)

  let result: Data

  if (req.query.email) {
    const { data } = await ReqResAPI.get('/users')

    const { data: employeeData } = await ReqResAPI.get(`/users`, {
      params: {
        per_page: data.total,
      },
    })

    const employees = employeeData.data.filter(
      (employee: Employee) =>
        employee.email.search(req.query.email as string) !== -1
    )

    result = {
      data: employees.slice(page == 1 ? 0 : per_page * page, per_page),
      page,
      per_page,
      total: employees.length,
      total_pages: Math.ceil(employees.length / per_page),
    }
  } else {
    const { data } = await ReqResAPI.get('/users', {
      params: {
        page,
        per_page,
      },
    })

    result = omit(data, ['support']) as Data
  }

  res.status(200).json(result)
}
