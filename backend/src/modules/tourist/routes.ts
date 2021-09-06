import { Request, Response } from 'express';

import { Tour } from '@schemas/Tour';

import TouristService from './service';

const hash = require('pbkdf2-password')();

export async function createTourist(req: Request, res: Response): Promise<Response> {
  const { name, username, password } = req.body;

  try {
    hash({ password }, async function (err, pass, salt, hash) {
      if (err) throw err;

      const data = {
        name,
        username,
        password: hash,
        salt,
      };

      const saved = await TouristService.createTourist(data);
      return res.status(200).json(saved);
    });
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

    await Tour.findByIdAndUpdate(tourId, {
      $push: {
        comments: saved._id,
      },
    });

    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function readTours(req: Request, res: Response): Promise<Response> {
  const { title } = req.query;

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

export async function getTourImage(req: Request, res: Response): Promise<void> {
  const { img } = req.params;
  res.sendFile(`/usr/app/uploads/${img}`);
}
