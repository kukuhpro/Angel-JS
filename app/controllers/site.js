const Controller = require('./controller')
const Rx = require('rxjs')

class SiteController extends Controller {
    constructor() {
        super()
    }

    index() {
        return this
            .res
            .render('index')
    }

    paymentCharge() {
        const tokenCache = this.req.query.token

        let readCacheObservable = Rx
            .Observable
            .bindNodeCallback(this.cache.get)

        readCacheObservable(tokenCache).map((val) => {
            return JSON.parse(val)
        }).filter((val) => val.order_id !== undefined).subscribe({
            next: (data) => {
                this
                    .res
                    .render('index', data)
            },
            error: (err) => {
                this
                    .res
                    .render('error')
            }
        })

        return
    }
}

module.exports = SiteController