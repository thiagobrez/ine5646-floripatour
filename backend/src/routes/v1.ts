import { Router } from 'express';

import * as adminRoutes from '../modules/admin/routes';
import * as guideRoutes from '../modules/guide/routes';
import * as touristRoutes from '../modules/tourist/routes';

const routes = Router();

routes.get('/guide', adminRoutes.readGuides);
routes.post('/guide', adminRoutes.createGuide);
routes.put('/guide/:id', guideRoutes.updateGuide);
routes.put('/guide/:id/password', guideRoutes.updateGuideInitialPassword);

routes.get('/tour', touristRoutes.readTours);
routes.post('/tour', guideRoutes.createTour);
routes.put('/tour/:id', guideRoutes.updateTour);

routes.post('/tourist', touristRoutes.createTourist);

routes.post('/tourComment', touristRoutes.createTourComment);

export default routes;
