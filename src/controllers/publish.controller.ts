import { Response, Request, NextFunction } from "express";
import User from "../model/user.model";
import publishModel from "../model/publish.model";
import messages from "../utils/Exception/messages";
import email   from  '../utils/mail'

// Create Property but with admin approver
export const createPublish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void | any> => {
  try {
    const checkUser = await User.findById({ _id: req.params.userId });
    if (checkUser?.user_is_approved === false) {
      return res
        .status(401)
        .json({ ok: false, msg: messages.UNAUTHORIZED_REQUEST });
    } else {
      
      const createProperty = await publishModel.create(req.body);
      if (createProperty) {
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: {
               user_is_approved: false,
               Requested : false
             },
          },
          { new: true }
        );
      }
      return res.status(200).json({ ok: true, result: createProperty });
    }
  } catch (error) {
    if (error) return res.status(500).json({ ok: false, msg: error });
  }
};
// User Should be able to publish after approval 

export const  UserpublishProperty = async (  
  req: Request,
  res: Response,
  next: NextFunction):Promise<Response | void> => { 
    try {
      const usertoPublish = await User.findOne({ email : req.body.email})
     if(usertoPublish?.user_is_approved != true) {
      return res
      .status(401)
      .json({ ok: false, msg: messages.UNAUTHORIZED_REQUEST });
     } else {
       const updateToisPublished = await publishModel.findOneAndUpdate({ _id : req.params.publishId}, {
         $set : { is_published : true}
       })
       if(updateToisPublished) {
         // Send Email in 20 minute
       const date = new Date();
        date.setTime(date.getTime()+(20*60*1000));
        const sendTime = "; expires="+date.toUTCString()
        const ClooperEmail = 'metrics@clooper.com'
        const to = [ClooperEmail]
        const subject = 'Property created By User'
        const text = 'Happy coding'
        const html = `
      Information from ${req.body.email}, Created some properities requesting for approver ${req.body} `
      //Send Email
      if(sendTime) {
        const send = await email.sendMail({to, subject, text, html})
        return res.status(200).json({ send })
      }
        
       }
     }
    } catch (error) {
      
    }
   
}
//Search for properties By address
export const SearchMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const search = req.body;
  const searchFor = await publishModel.find({ address: search });
  if (!search || !searchFor) {
    return res
      .status(404)
      .json({ ok: false, msg: "Can't find what you are looking for" });
  } else {
    return res.status(200).json({ ok: true, searchFor });
  }
};

// Request for Approval From Admin
export const requestApproval = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const sendRequest = await User.findOne({ _id: req.params.userId });
    if (
      sendRequest?.Requested != false ||
      sendRequest?.user_is_approved != false
    ) {
      return res.status(403).json({ ok: false, msg: messages.PENDING });
    } else {
      const request_Approval = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: { Requested: true } }
      );
      return res.status(200).json({ ok: true, msg: messages.SUCCESS });
    }
  } catch (error) {
    if (error)
      return res
        .status(500)
        .json({ ok: false, msg: messages.SOMETHING_WENT_WRONG });
  }
};

// Only Update Property When Authorized by Admin
export const UpdatePublish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const is_Approved = await User.findOne({ email: req.body.email });
    //  const is_Approved = await User.findOne({_id : req.params._id}, {user_is_approved : true})
    //Checking  if user is authorized to publish by admin
    if (
      !req.body ||
      is_Approved?.Requested != true ||
      is_Approved?.user_is_approved != true
    ) {
      return res
        .status(403)
        .json({ ok: false, msg: messages.UNAUTHORIZED_REQUEST });
    } else {
      const updated = await publishModel.findOneAndUpdate(
        { _id: req.params.publishedId },
        {
          $set:req.body,
        },
        { new: true }
      );
      if(updated) {
        await User.findOneAndUpdate(
          { email: req.body.email },
          {
            $set: { 
              user_is_approved: false,
              Requested : false
             },
          },
          { new: true }
        );
      }
      return res.status(200).json({ ok: true, updated });
    }
  } catch (error) {
    if (error)
      return res
        .status(500)
        .json({ ok: false, msg: messages.SOMETHING_WENT_WRONG });
  }
};

// Only Delete Property When Authorized by Admin
export const DeletePublish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const findUserAccess = await User.findOne({email : req.body.email})
 
    if(findUserAccess?.Requested != true  || findUserAccess?.user_is_approved != true) {
      return res
      .status(403)
      .json({ ok: false, msg: messages.UNAUTHORIZED_REQUEST });
    } else {
        const deleted = await publishModel.findByIdAndDelete({ _id: req.params.publishedId})
        if(deleted) {
          await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
              $set: { 
                user_is_approved: false,
                Requested : false
              },
            },
            { new: true }
          );
        }
        }
        return res.status(200).json({ ok: true, msg : messages.SUCCESS });
  } catch (error) {
    if (error)
      return res
        .status(500)
        .json({ ok: false, msg: messages.SOMETHING_WENT_WRONG });
  }
};


