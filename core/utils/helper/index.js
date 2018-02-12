module.exports = {
    convertError(joiError) {
        let newArrayErrors = []
        const array = joiError.details
        for (let index = 0; index < array.length; index++) {
            let element = array[index]
            const message = element.message
            newArrayErrors.push(message.replace('"', "'").replace('\"', '').replace("'", ''))
        }
        return newArrayErrors
    }
}