module.exports = (value) => {
    if(value === null || 
       value === undefined || 
       Object.keys(value).length === 0 ||
       value.length === 0 ||
       value.trim() === "" 
    ) {
        return true 
    } else {
        return false
    }
}