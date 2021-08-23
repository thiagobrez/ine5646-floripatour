import { GuideData, IGuideModel } from '@schemas/Guide';
import { Guide } from '@schemas/Guide';

class AdminService {
  public async readGuides(): Promise<IGuideModel[]> {
    return await Guide.find();
  }

  public async createGuide(data: Partial<GuideData>): Promise<IGuideModel> {
    const guide = new Guide(data);
    return await guide.save();
  }
}

export default new AdminService();
