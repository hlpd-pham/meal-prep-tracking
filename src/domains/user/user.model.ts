import { Model } from 'objection';
import * as bcrypt from 'bcrypt';

export class User extends Model {
  static tableName = 'users';

  id!: number;
  username!: string;
  email?: string;
  password!: string;

  async $beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
