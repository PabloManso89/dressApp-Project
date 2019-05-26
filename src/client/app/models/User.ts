export interface IUser {
  email: string,
  password: string
}

export class User implements IUser {
  constructor(
    public email: string,
    public password: string,
    public id?: string,
    public name?: string,
    public age?: number,
    public gender?: string,
    public registrationDate?: Date,
  ) {}
}
