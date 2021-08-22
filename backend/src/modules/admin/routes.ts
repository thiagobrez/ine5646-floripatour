import { Request, Response } from 'express';

import AdminService from './service';

export async function createGuide(req: Request, res: Response): Promise<Response> {
  console.log('req.params', req.params);

  const { name, username, password, registryNumber, email, phone } = req.params;

  const data = {
    name,
    username,
    password, // TODO: hash password
    registryNumber: Number(registryNumber),
    email,
    phone,
    active: true,
  };

  const saved = await AdminService.createGuide(data);

  console.log('saved ROUTES', saved);

  return res.status(200).json(saved);
}
