// import { User } from '../models/User';
// import { DatabaseError } from '../utils/errors/customError';

// export class UserSeed {
//   public static bulkInsert() {
//     User.sync({ force: true }).then(() => {
//       return User.bulkCreate(
//         [
//           {
//             username: 'jameslo',
//             displayName: 'James Lo',
//             password: 'james',
//             email: 'james.lo@gmail.com',
//           },
//           {
//             username: 'oliviafranslay',
//             displayName: 'Olivia Franslay',
//             password: 'olivia',
//             email: 'olivia.franslay@gmail.com',
//           },
//         ],
//         {
//           validate: true,
//           ignoreDuplicates: false,
//         },
//       ).then((insertedValues: any) => {
//         insertedValues.forEach((value: any) => {
//           console.log(`Seeds Insert: ${JSON.stringify(value.dataValues)}`);
//         });
//       });
//     }).catch((err: any) => {
//       throw new DatabaseError(`UserSeed cannot be created: ${err.message}`);
//     });
//   }
//   public static selectAll() {
//     User.findAll().then((users: any) => {
//       return users.map((user: any) => user.dataValues);
//     });
//   }
// }
