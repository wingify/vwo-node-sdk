function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getUsers() {
  const users = [
    'Ashley',
    'Bill',
    'Chris',
    'Dominic',
    'Emma',
    'Faizan',
    'Gimmy',
    'Harry',
    'Ian',
    'John',
    'King',
    'Lisa',
    'Mona',
    'Nina',
    'Olivia',
    'Pete',
    'Queen',
    'Robert',
    'Sarah',
    'Tierra',
    'Una',
    'Varun',
    'Will',
    'Xin',
    'You',
    'Zeba'
  ];

  return users;
}
function getRandomUser() {
  const users = getUsers();

  return users[getRandomArbitrary(0, 10)];
}

module.exports = {
  getUsers,
  getRandomUser
};
