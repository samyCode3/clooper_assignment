import { boolean } from "joi";
import mongoose, {model , Schema, Document} from "mongoose";

export interface Admin{
  first_name: string,
  last_name: string,
  email: string,
  phone: number,
  password: string,
  is_admin : Boolean,

}
export interface AdminModel extends Admin, Document {}
const adminSchema = new Schema({
  first_name : {
      type:  String,
      required : true
  },
  last_name : {
      type:  String,
      required : true
  },
  email : {
      type:  String,
      required : true,
      unique :  true,
      trim  :  true
    },
  phone : {
      type : Number,
      require : true
  }, 
  password : {
      type : String,
      required: true
  },
  is_admin : {
      type: Boolean,
      default : false
  }
}, {timestamps : true})


export default model<AdminModel>('admin', adminSchema)