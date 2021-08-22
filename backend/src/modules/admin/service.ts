import { GuideData, IGuideModel } from '@schemas/Guide';
import { Guide } from '@schemas/Guide';

class AdminService {
  public async createGuide(data: GuideData): Promise<IGuideModel> {
    const guide = new Guide(data);

    try {
      const saved = await guide.save();
      console.log('saved SERVICE', saved);
      return saved;
    } catch (e) {
      console.log('e', e);
      return e;
    }
  }
}

export default new AdminService();
