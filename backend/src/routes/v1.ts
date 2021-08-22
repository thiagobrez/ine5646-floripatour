import { Router } from 'express';

import * as adminRoutes from '../modules/admin/routes';

const routes = Router();

routes.post('/guide/create', adminRoutes.createGuide);

export default routes;
