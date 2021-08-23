import { Request, Response } from 'express';

import TouristService from './service';

export async function createTourist(req: Request, res: Response): Promise<Response> {
  const { name, username, password } = req.body;

  const data = {
    name,
    username,
    password, //TODO: Hash password
  };

  try {
    const saved = await TouristService.createTourist(data);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function createTourComment(req: Request, res: Response): Promise<Response> {
  const { userId, tourId, text } = req.body;

  const data = {
    userId,
    tourId,
    text,
  };

  try {
    const saved = await TouristService.createTourComment(data);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function readTours(req: Request, res: Response): Promise<Response> {
  const { title } = req.query;

  console.log('title', title);

  const filters = {
    title: title as string,
  };

  try {
    const tours = await TouristService.readTours(filters);
    return res.status(200).json(tours);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}
