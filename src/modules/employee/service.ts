import { ParsedUrlQuery } from 'querystring'

import { API } from '@/lib/api'
import decorateQuery from '@/lib/decorate-query'

const listEmployees = async (query: ParsedUrlQuery) => {
  const params = decorateQuery(query)

  const { data } = await API.get('/employees', { params })

  return data
}

const getEmployeeById = async (id: string) => {
  const { data } = await API.get(`/employees/${id}`)

  return data
}

const EmployeeService = {
  listEmployees,
  getEmployeeById,
}

export default EmployeeService
