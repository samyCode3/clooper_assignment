import {Response, Request, NextFunction} from 'express'
import validation from '../utils/joiValidation/validation'
import messages from '../utils/Exception/messages'
import User from '../model/user.model'


//User Signup function

export const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {error, value} = validation.UserValidation(req.body)
        const findUser = await User.findOne( { email : value.email})
        if(error) {
            return res.status(400).json({ ok: false, msg : error.message})
        } else {
            if(findUser) {
                return res.status(400).json({ok:false, msg: messages.DUPLICATE_EMAIL})
           } else {
               const createUser = await User.create({...value})
              const created =    await User.findOneAndUpdate({email : createUser.email}, {
                $set: {is_active: true}
            }, {new : true});
            return res.status(201).json({ ok: true, msg : messages.CREATED, created})
            
           }
        }
      
    } catch (error) {
        if(error) return res.status(500).json({ ok : false, msg : messages.SOMETHING_WENT_WRONG})
    }
    
}

