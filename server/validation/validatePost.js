const isEmpty = require('./isEmpty')

module.exports = (text, header) => {
    isEmpty(text) ? text = "" : null 
    isEmpty(header) ? header = "" : null 

    let errors = {}
    if(!text) {
        errors.text = "Error, message required"
    }

    if(!header) {
        errors.header = "Error, title required"
    }
    return errors
}