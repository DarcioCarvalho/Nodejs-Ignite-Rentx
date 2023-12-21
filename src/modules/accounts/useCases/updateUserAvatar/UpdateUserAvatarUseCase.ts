import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../entities/User";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }
  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}

export { UpdateUserAvatarUseCase }