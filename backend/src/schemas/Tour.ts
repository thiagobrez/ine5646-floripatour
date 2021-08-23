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
  price: number;
};

export type ITourModel = Document & TourData;

const TourSchema = new Schema<ITourModel>(
  {
    title: { type: String, required: true },
    description: String,
    images: [String],
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    minTourists: Number,
    maxTourists: Number,
    active: { type: Boolean, default: true },
    availableDates: [Number],
    comments: [{ type: Schema.Types.ObjectId, ref: 'TourComment' }],
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Tour = model<ITourModel>('Tour', TourSchema);
