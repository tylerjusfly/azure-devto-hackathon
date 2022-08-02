const dotenv = require('dotenv')

dotenv.config()

exports.envVariables = {
    mongoDbString : process.env.CONN_STR
}