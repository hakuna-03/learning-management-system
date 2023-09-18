const login = require('./login')

module.exports = {
    paths:{
        '/login':{
            ...login
        }
    }
}