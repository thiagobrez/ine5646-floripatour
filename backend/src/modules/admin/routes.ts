import { Request, Response } from 'express';

import AdminService from './service';

const hash = require('pbkdf2-password')();

export async function readGuides(req: Request, res: Response): Promise<Response> {
  const guides = await AdminService.readGuides();
  return res.status(200).json(guides);
}

export async function createGuide(req: Request, res: Response): Promise<Response> {
  const { name, username, password, registryNumber, email, phone } = req.body;

  try {
    hash({ password }, async function (err, pass, salt, hash) {
      if (err) throw err;

      const data = {
        name,
        username,
        password: hash,
        salt,
        registryNumber,
        email,
        phone,
      };

      const saved = await AdminService.createGuide(data);
      return res.status(200).json(saved);
    });
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}
