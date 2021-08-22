import { Document, Schema, model } from 'mongoose';

export type TourData = {
  title: string;
  description: string;
  images: string[];
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  minTourists: number;
  maxTourists: number;
  active: boolean;
  availableDates: number[];
  comments: string[];
};

export type ITourModel = Document & TourData;

const TourSchema = new Schema<ITourModel>(
  {
    title: String,
    description: String,
    images: [String],
    startLocation: String,
    endLocation: String,
    startTime: String,
    endTime: String,
    minTourists: Number,
    maxTourists: Number,
    active: Boolean,
    availableDates: [Number],
    comments: [{ type: Schema.Types.ObjectId, ref: 'TourComment' }],
  },
  { timestamps: true }
);

export const Tour = model<ITourModel>('Tour', TourSchema);
