const axios = require('axios')
const Rx = require('rxjs')

class Midtrans {
    constructor() {
        this.axios = axios
    }

    /**
     * This function is for handling services to payment gateway midtrans
     *
     * @param {object} requestdata
     * @param {function} callback
     *
     * @memberOf Midtrans
     */
    snapTransactions(requestdata, callback) {
        callback(null, "d379aa71-99eb-4dd1-b9bb-eefe813746e9")
    }
}

module.exports = Midtrans