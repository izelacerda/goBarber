import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(id: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
