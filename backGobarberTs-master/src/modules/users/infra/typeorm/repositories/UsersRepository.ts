// import { isEqual } from 'date-fns';
import { getRepository, Repository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
