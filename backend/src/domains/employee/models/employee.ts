import { Document, Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

export interface EmployeeDocument extends Document {
  first_name: string
  last_name: string
  email: string
  avatar: string
}

interface EmployeeModel
  extends PaginateModel<EmployeeDocument, EmployeeModel> {}

const employeeSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

employeeSchema.plugin(paginate)

const EmployeeModel = model<EmployeeDocument, EmployeeModel>(
  'Employee',
  employeeSchema
)

export default EmployeeModel
