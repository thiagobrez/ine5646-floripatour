import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { GuideData } from '@schemas/Guide';
import { TourData } from '@schemas/Tour';

import GuideService from './service';

const hash = require('pbkdf2-password')();

export async function updateGuideInitialPassword(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { password } = req.body;

  try {
    hash({ password }, async function (err, pass, salt, hash) {
      if (err) throw err;

      const update = {
        password: hash,
        salt,
        isFirstLogin: false,
      };

      const saved = await GuideService.updateGuide(id, update);
      return res.status(200).json(saved);
    });
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

export async function updateGuide(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { name, username, registryNumber, email, phone, active } = req.body;

  const update: Partial<GuideData> = {};

  if (name !== undefined) update.name = name;
  if (username !== undefined) update.username = username;
  if (registryNumber !== undefined) update.registryNumber = registryNumber;
  if (email !== undefined) update.email = email;
  if (phone !== undefined) update.phone = phone;
  if (active !== undefined) update.active = active;

  try {
    const saved = await GuideService.updateGuide(id, update);
    return res.status(200).json(saved);
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error });
  }
}

const handleError = (err, res) => {
  res.status(500).end('Oops! Something went wrong!');
};

export async function createTour(req: Request & { files: any }, res: Response): Promise<Response> {
  const images: string[] = [];

  req.files.forEach((file) => {
    images.push(file.originalname);

    const tempPath = file.path;
    const extension = path.extname(file.originalname).toLowerCase();
    const targetPath = `/usr/app/uploads/${file.originalname}`;

    if (extension === '.png' || extension === '.jpeg' || extension === '.jpg') {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
      });
    }
  });

  const data = {
    title: req.body.title,
    description: req.body.description,
    images,
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    minTourists: req.body.minTourists,
    maxTourists: req.body.maxTourists,
    price: req.body.price,
    availableDates: req.body.availableDates,
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
