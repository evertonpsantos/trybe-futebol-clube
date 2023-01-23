interface IUser {
  email: string,
  password: string
}

interface IUserDB {
  id: number,
  username: string,
  role: string,
  email: string,
}

export default IUser;
export { IUserDB };
