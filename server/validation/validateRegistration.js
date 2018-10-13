const isEmpty = require('./isEmpty')

module.exports = (email, password, name) => {
    isEmpty(email) ? email = "" : null
    isEmpty(password) ? password = "" : null
    isEmpty(name) ? name = "" : null

    let errors = {};
    if(isEmpty(email)) {
        errors.email = "Error, email required"
    }

    if(isEmpty(name)) {
        errors.name = "Error, name required"
    }

    if(isEmpty(password)) {
        errors.password = "Error, password required"
    }

    if(!isEmpty(password) && password.length < 6) {
        errors.password = "Error, password length must be 6 symbols minimum"
    }

    if(password.length > 50) {
        errors.password = "Error, password can't be more than 50 symblos"
    }

    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if(!isEmpty(email) && !emailRegExp.test(email)) {
        errors.email = "Error, wrong email adress"
    }

    return errors
}