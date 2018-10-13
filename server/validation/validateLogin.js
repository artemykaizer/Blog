const isEmpty = require('./isEmpty')

module.exports = (email, password) => {
    isEmpty(email) ? email = "" : null
    isEmpty(password) ? password = "" : null

    let errors = {};
    if(isEmpty(email)) {
        errors.email = "Error, email required"
    }

    if(isEmpty(password)) {
        errors.password = "Error, password required"
    }
    

    return errors
}