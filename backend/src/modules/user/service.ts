import { IUserModel, User } from '@schemas/User';

class UserService {
  public async findByUsername(username: string): Promise<IUserModel> {
    return await User.findOne({ username });
  }
}

export default new UserService();
