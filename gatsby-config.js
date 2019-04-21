const dbConnect = {
    host: process.env.mysqlHost || 'localhost',
    user: process.env.mysqlUser || 'root',
    password: process.env.mysqlPass || 'password',
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
