const bcrypt = require('bcrypt');

const password = 'Galuh01';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
