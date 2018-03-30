import User from '../models/User';

function insertUsers() {
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
    ).then((insertedValues) => {
      insertedValues.forEach((value: any) => {
        console.log(`Seeds Insert: ${JSON.stringify(value.dataValues)}`);
      });
    });
  });
}

function selectAllUsers() {
  User.findAll().then((users) => {
    return users.map((user: any) => user.dataValues);
  });
}

export {
  selectAllUsers,
  insertUsers,
};
