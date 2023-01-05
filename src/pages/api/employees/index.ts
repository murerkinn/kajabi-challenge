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

  const { data } = await ReqResAPI.get('/users')

  delete data.support

  res.status(200).json(data)
}
