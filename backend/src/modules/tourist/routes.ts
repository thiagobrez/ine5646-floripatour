import { Request, Response } from 'express';
// import UserService from './service'

export async function getUsers(req: Request, res: Response): Promise<Response> {
  // const users = await UserService.findAll();
  return res.status(200).json({ message: 'oi' });
}
