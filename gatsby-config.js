require('dotenv').config();

const dbConnect = {
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPass,
    database: 'juconnect'
}
module.exports = {
      siteMetadata: {
        title: `JU Connect`,
      },
      // pathPrefix: '../',
      plugins: [
        {
          resolve: 'gatsby-source-mysql',
          options: {
            connectionDetails: dbConnect,
            query: 'SELECT * FROM subscribers',
            idFieldName: 'roll',
            typePrefix: 'Subscribers'
            }
        },
        {
            resolve: 'gatsby-source-mysql',
            options: {
              connectionDetails: dbConnect,
              query: 'SELECT * FROM channels',
              idFieldName: 'slug',
              typePrefix: 'Channels'
              }
        }
      ]
  };
