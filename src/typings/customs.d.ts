import User from '../model/user.model'
declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}