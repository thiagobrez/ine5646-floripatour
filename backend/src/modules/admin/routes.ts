import { Request, Response } from 'express';

import AdminService from './service';

export async function readGuides(req: Request, res: Response): Promise<Response> {
  const guides = await AdminService.readGuides();
  return res.status(200).json(guides);
}

export async function createGuide(req: Request, res: Response): Promise<Response> {
  const { name, username, password, registryNumber, email, phone } = req.body;

  const data = {
    name,
    username,
    password, // TODO: hash password
    registryNumber,
    email,
    phone,
    active: true,
  };

  try {
    const saved = await AdminService.createGuide(data);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}
