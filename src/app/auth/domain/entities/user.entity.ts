export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly uuid: string,
  ) {}
}
