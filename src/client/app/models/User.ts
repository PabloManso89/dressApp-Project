export interface IUser {
  email: string,
  password: string
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public age: string,
    public gender: string,
    public password: string
  ) {}
}
