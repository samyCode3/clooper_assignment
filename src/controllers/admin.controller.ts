import {Response, Request, NextFunction} from 'express'
import validation from '../utils/joiValidation/validation'
import messages from '../utils/Exception/messages'
import Admin from '../model/admin.user'
import User  from '../model/user.model'
import publishModel from '../model/publish.model'

//Admin signup function
export const CreateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {error, value} = validation.UserValidation(req.body)
        const findAdmin = await Admin.findOne( { email : value.email})
        if(error) {
            return res.status(400).json({ ok: false, msg : error.message})
        } else {
            if(findAdmin) {
                return res.status(400).json({ok:false, msg: messages.DUPLICATE_EMAIL})
           } else {
               const createAdmin = await Admin.create({...value})
               createAdmin.save().then((result) => {
                if(result) {
                     Admin.findOneAndUpdate({email : req.body.email}, {
                       $set: {is_active: true}
                    }, {new : true})
                }
               }).catch((error) => { if(error) return res.status(500).json({ ok : false, msg : error.message})})
           }
        }
      
    } catch (error) {
        if(error) return res.status(500).json({ ok : false, msg : messages.SOMETHING_WENT_WRONG})
    }
    
}


//Approve User to create property 
export const AdminApproval = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try 
    {
        const findAdmin = await Admin.findOne({_id : req.params.adminId })
        if(findAdmin?.is_admin != true || !req.body.requestId) {
          return res
          .status(403)
          .json({ ok: false, msg: messages.BAD_REQUEST });
        } else {
            await User.findOneAndUpdate({_id : req.body.requestId}, {
                $set : { user_is_approved : true}
            }, { new : true})
            return res.status(200).json({ ok : true, msg : messages. APPROVE_USER})
          
        }
    } catch (error) {

    }
     

}
//DisApprove User to create property 
export const AdminDisApproval = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try 
    {
        const findAdmin = await Admin.findOne({_id : req.params.adminId })
        if(findAdmin?.is_admin != true || !req.body.requestId) {
          return res
          .status(403)
          .json({ ok: false, msg: messages.BAD_REQUEST });
        } else {
          await User.findOneAndUpdate({_id : req.body.requestId}, {
                $set : { 
                    Requested : false,
                    user_is_approved : false
                }
            }, { new : true})
            return res.status(200).json({ ok : true, msg : messages.DISAPPROVE_USER})
          
        }
    } catch (error) {

    }
     

}

  //Deactivate user 

  export const Disactivate = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try 
    {
        const findAdmin = await Admin.findOne({_id : req.params.adminId })
        if(findAdmin?.is_admin != true || !req.body.requestId) {
          return res
          .status(403)
          .json({ ok: false, msg: messages.BAD_REQUEST });
        } else {
          await User.findOneAndUpdate({_id : req.body.requestId}, {
                $set : { 
                    is_active : false
                }
            }, { new : true})
            return res.status(200).json({ ok : true, msg : messages.DISAPPROVE_USER})
          
        }
    } catch (error) {
      return res
      .status(500)
      .json({ ok: false, msg: messages.SOMETHING_WENT_WRONG });
    }
     

}


  //Activate user 

  export const Activate = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try 
    {
        const findAdmin = await Admin.findOne({_id : req.params.adminId })
        if(findAdmin?.is_admin != true || !req.body.requestId) {
          return res
          .status(403)
          .json({ ok: false, msg: messages.BAD_REQUEST });
        } else {
          await User.findOneAndUpdate({_id : req.body.requestId}, {
                $set : { 
                    is_active : true
                }
            }, { new : true})
            return res.status(200).json({ ok : true, msg : messages.DISAPPROVE_USER})
          
        }
    } catch (error) {
      return res
      .status(500)
      .json({ ok: false, msg: messages.SOMETHING_WENT_WRONG });
    }
     

}
