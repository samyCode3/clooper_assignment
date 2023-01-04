import express, { Application} from 'express';

import { createPublish, requestApproval, SearchMethod, UpdatePublish, DeletePublish, UserpublishProperty   } from '../controllers/publish.controller';

const router: Application = express()

router.post('/createProperty/:userId', createPublish)
router.post('/request/:userId', requestApproval)
router.post('/publish/:publishId', UserpublishProperty)
router.get('/search', SearchMethod )
router.put('/update/:publishedId', UpdatePublish)
router.delete('/delete/:publishedId', DeletePublish)
export default router