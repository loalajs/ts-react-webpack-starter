import { User } from '../models/User';

export class UserSeed {
  public static bulkInsert() {
    User.sync({ force: true }).then(() => {
      return User.bulkCreate(
        [
          {
            username: 'jameslo',
            displayName: 'James Lo',
            password: 'james',
            email: 'james.lo@gmail.com',
          },
          {
            username: 'oliviafranslay',
            displayName: 'Olivia Franslay',
            password: 'olivia',
            email: 'olivia.franslay@gmail.com',
          },
        ],
        {
          validate: true,
          ignoreDuplicates: false,
        },
      ).then((insertedValues: any) => {
        insertedValues.forEach((value: any) => {
          console.log(`Seeds Insert: ${JSON.stringify(value.dataValues)}`);
        });
      });
    });
  }
  public static selectAll() {
    User.findAll().then((users: any) => {
      return users.map((user: any) => user.dataValues);
    });
  }
}
