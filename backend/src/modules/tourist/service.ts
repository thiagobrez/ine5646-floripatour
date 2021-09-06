import { ITourModel, Tour, TourData } from '@schemas/Tour';
import { ITourCommentModel, TourComment, TourCommentData } from '@schemas/TourComment';
import { ITouristModel, Tourist, TouristData } from '@schemas/Tourist';

class TouristService {
  public async createTourist(data: Partial<TouristData>): Promise<ITouristModel> {
    const tourist = new Tourist(data);
    return await tourist.save();
  }

  public async createTourComment(data: Partial<TourCommentData>): Promise<ITourCommentModel> {
    const tourComment = new TourComment(data);
    const saved = await tourComment.save();
    return saved;
  }

  public async readTours(data: Partial<TourData>): Promise<ITourModel[]> {
    const { title } = data;
    return await Tour.find({
      title: new RegExp(title, 'i'),
      active: true,
    })
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      })
      .exec();
  }
}

export default new TouristService();
