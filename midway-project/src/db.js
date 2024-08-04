const { DataSource } = require('typeorm');
const { User } = require('./entity/user');
const { Circle } = require('./entity/circle');

// 创建数据源
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zky134679852zky',
  database: 'web',
  synchronize: true,
  logging: false,
  entities: [User, Circle],
  migrations: ["src/migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.js"],
});


AppDataSource.initialize().then(async() => {


  // 创建新用户实例
  const user = new User();
  user.id = '1';
  user.username = 'Yao';
  user.password = 'zky134679852zky';
  user.avatar = 'default';

  // 保存新用户到数据库
  try {
    await AppDataSource.manager.save(user);
    console.log('New User has been saved');
  } catch (error) {
    console.error('Error saving new user:', error);
  }
  
  // 创建初始圈子
  const circles = [
    { name: '运动圈', isDefault: true },
    { name: '萌宠圈', isDefault: true },
    { name: '学习圈', isDefault: true },
    { name: '美食圈', isDefault: true },
    { name: '旅行圈', isDefault: true },
  ];

  // 保存初始圈子到数据库
  try {
    for (const circleData of circles) {
      const circle = new Circle();
      circle.name = circleData.name;
      circle.isDefault = circleData.isDefault;
      await AppDataSource.manager.save(circle);
    }
    console.log('Initial circles have been saved');
  } catch (error) {
    console.error('Error saving initial circles:', error);
  }
}).catch(error => console.error('Error during Data Source initialization:', error));

module.exports = {AppDataSource};
