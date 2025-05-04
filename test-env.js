console.log('Current working directory:', process.cwd());
require('dotenv').config({ path: './Mental-Oasis/.env' });
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PW:', process.env.DB_PW);
