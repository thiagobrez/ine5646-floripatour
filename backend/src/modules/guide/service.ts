import { GuideData, IGuideModel } from '@schemas/Guide';
import { Guide } from '@schemas/Guide';
import { ITourModel, Tour, TourData } from '@schemas/Tour';

class GuideService {
  public async updateGuide(id: string, update: Partial<GuideData>): Promise<IGuideModel> {
    return await Guide.findOneAndUpdate({ _id: id }, update, { new: true });
  }

  public async createTour(data: Partial<TourData>): Promise<ITourModel> {
    const tour = new Tour(data);
    return await tour.save();
  }

  public async updateTour(id: string, update: Partial<TourData>): Promise<ITourModel> {
    return await Tour.findOneAndUpdate({ _id: id }, update, { new: true });
  }
}

export default new GuideService();
