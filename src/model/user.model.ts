import { boolean } from "joi";
import mongoose, {model , Schema, Document} from "mongoose";

export interface User{
  first_name: string,
  last_name: string,
  email: string,
  phone: number,
  password: string,
  is_admin : Boolean,
  is_active : Boolean,
  Requested : Boolean,
  user_is_approved : Boolean
}
export interface UserModel extends User, Document {}
const userSchema = new Schema({

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
  is_admin : {
      type: Boolean,
      default : false
  },
  is_active : {
    type: Boolean,
    default : false
  }, 
  Requested : {
    type : Boolean, 
    default: false
   },
user_is_approved : {
    type : Boolean, 
    default: false
}
 
}, {timestamps : true})


export default model<UserModel>('users', userSchema)