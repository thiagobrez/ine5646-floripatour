import { Request, Response } from 'express';

import { GuideData } from '@schemas/Guide';
import { TourData } from '@schemas/Tour';

import GuideService from './service';

export async function updateGuide(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { name, username, password, registryNumber, email, phone, active } = req.body;

  const update: Partial<GuideData> = {};

  if (name !== undefined) update.name = name;
  if (username !== undefined) update.username = username;
  if (password !== undefined) update.password = password; //TODO: hash password
  if (registryNumber !== undefined) update.registryNumber = registryNumber;
  if (email !== undefined) update.email = email;
  if (phone !== undefined) update.phone = phone;
  if (active !== undefined) update.active = active; //TODO: Check if isAdmin

  try {
    const saved = await GuideService.updateGuide(id, update);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function createTour(req: Request, res: Response): Promise<Response> {
  const {
    title,
    description,
    images,
    startLocation,
    endLocation,
    startTime,
    endTime,
    minTourists,
    maxTourists,
    price,
  } = req.body;

  // TODO: Tratar imagens - salvar no disco

  const data = {
    title,
    description,
    images, // passar paths das imagens
    startLocation,
    endLocation,
    startTime,
    endTime,
    minTourists,
    maxTourists,
    price,
  };

  try {
    const saved = await GuideService.createTour(data);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function updateTour(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { active, availableDates } = req.body;

  const update: Partial<TourData> = {};

  if (active !== undefined) update.active = active;
  if (availableDates !== undefined) update.availableDates = availableDates;

  try {
    const saved = await GuideService.updateTour(id, update);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}
