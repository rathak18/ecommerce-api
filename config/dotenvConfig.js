const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'rajendra1993:simple12345@cluster0.xm184yr.mongodb.net/blogecommerce',
  SECRET_KEY: process.env.SECRET_KEY || 'bvdcbdcdnchhbiyewekhc',
};