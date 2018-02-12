const Abstract = require('./controller')
const uuid = require('uuid')
const Rx = require('rxjs')
const database = require('../../core/database')

class Auth extends Abstract {
    constructor() {
        super()
    }

    form() {
        this
            .res
            .render('site/form')

        return
    }

    login() {
        const username = this.req.body.username
        const password = this.req.body.password

        this
            .res
            .json({helloer: "kukuh"})

        return
    }

    requestPayment() {
        const valueCache = uuid.v1()
        const dataCache = {
            order_id: this.req.body.order_id,
            amount: this.req.body.amount
        }

        let setcacheObservable = Rx
            .Observable
            .bindNodeCallback(this.cache.set)

        setcacheObservable(valueCache, JSON.stringify(dataCache), {ttl: 60}).map(() => {
            dataCache['token'] = valueCache
            dataCache['url'] = "http://localhost:3434/payment/charge?token=" + valueCache

            return dataCache
        }).subscribe({
            next: (data) => {
                this
                    .response
                    .setData(data, 'payment')

                this
                    .res
                    .status(200)
                    .json(this.response.getAll())
            },
            error: (err) => {
                this
                    .response
                    .setStatus(4)

                this
                    .res
                    .status(400)
                    .json(this.response.getAll())
            }
        })

        return
    }
}

module.exports = Auth