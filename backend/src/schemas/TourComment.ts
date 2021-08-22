import { Document, Schema, model } from 'mongoose';

export type TourCommentData = {
  tourId: string;
  userId: string;
  text: string;
};

export type ITourCommentModel = Document & TourCommentData;

const TourCommentSchema = new Schema<ITourCommentModel>(
  {
    tourId: { type: Schema.Types.ObjectId, ref: 'Tour' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
  },
  { timestamps: true }
);

export const TourComment = model<ITourCommentModel>('TourComment', TourCommentSchema);
