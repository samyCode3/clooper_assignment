import { boolean } from "joi";
import mongoose, {model , Schema, Document} from "mongoose";

export interface Admin{
  name  : string,
  address   : Array<string | number>,
  type  : string,
  image_url  : string,
  occupancy_type  : string,
  rent_amount  : string,
  totals_room  : string,
  rent_frequency: string,
  is_published: Boolean,
  is_approved  : Boolean,
}
export interface AdminModel extends Admin, Document {}
const publishSchema = new Schema({
    name : {
      type:  String,
      required : true
  },
   address : {
      type: String,
      required: true
   },
   type : {
     type :  String,
     required: true
   },
   description : {
     type : String, 
     default : ''
   },
   image_url : {
    type :  String,
    required: true
   }, 
   occupancy_type : {
    type :  String,
    required: true
   },
   rent_amount  : {
    type :  String,
    required: true
   },
   totals_room : {
    type :  String,
    required: true
   },
   rent_frequency : {
    type :  String,
    required: true
   },
   is_published : {
    type :  String,
    required: true,
    default: false
   },
  is_approved : {
    type :  String,
    required: true,
    default: false
  }
 
}, {timestamps : true})


export default model<AdminModel>('publish', publishSchema)