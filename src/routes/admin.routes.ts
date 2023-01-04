import express, { Application} from 'express';
import {CreateAdmin, AdminApproval, AdminDisApproval, Disactivate, Activate} from '../controllers/admin.controller';
const router: Application = express()

router.post ('/admin/register', CreateAdmin)
router.post ('/admin/approve/:adminId', AdminApproval)
router.put ('/admin/disapprove/:adminId', AdminDisApproval)
router.post('/admin/activate/:adminId', Activate)
router.post('/admin/disactivate/:adminId', Disactivate)



export default router