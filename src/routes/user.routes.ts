import express, { Application} from 'express';
import {CreateUser} from '../controllers/user.controller';


const router: Application = express()

router.post ('/register', CreateUser)

export default router