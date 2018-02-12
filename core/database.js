const sqlite3 = require('sqlite3').verbose()

class database {
    constructor() {
        this.db = new sqlite3.Database(':memory:')
    }

    create(query) {
        return new Promise((resolve, reject) => {
            const callbackFunction = () => {
                this
                    .db
                    .run(query)

                resolve()
            }

            this.serialize(callbackFunction)
        })
    }

    select(query) {
        return new Promise((resolve, reject) => {
            const callbackFunction = () => {
                this
                    .db
                    .each(query, (err, row) => {
                        if (err != null) {
                            reject(err)
                        } else {
                            resolve(row)
                        }
                    })
            }

            this.serialize(callbackFunction)
        })
    }

    serialize(func) {
        this
            .db
            .serialize(func)
    }

    insert(query, arrayValue) {
        return new Promise((resolve, reject) => {
            const callbackFunction = () => {
                let stmt = this
                    .db
                    .prepare(query)

                for (var index = 0; index < arrayValue.length; index++) {
                    var element = arrayValue[index]
                    stmt.run(element)
                }

                stmt.finalize()

                resolve()
            }

            this.serialize(callbackFunction)
        })
    }
}

module.exports = database