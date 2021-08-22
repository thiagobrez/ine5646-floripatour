import { User } from '@schemas/User';

class UserService {
  public async findAll(): Promise<any> {
    return User.find();
  }
}

export default new UserService();
