import type { NextApiRequest, NextApiResponse } from 'next'

import { ReqResAPI } from '@/lib/api'
import { Employee } from '@/modules/employee/types'

type Data =
  | {
      data: Employee
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

  const { data } = await ReqResAPI.get(`/users/${req.query.id}`)

  if (!data) {
    res.status(404).json({ error: 'Not found' })
    return
  }

  res.status(200).json(data.data)
}
