export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  token?: string;

  constructor(id: number, name: string, username: string, email: string, role: string, token: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}
