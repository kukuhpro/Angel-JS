const session = require('express-session')
const cookieParse = require('cookie-parser')

const cacheManager = require('cache-manager')
const redistStore = require('cache-manager-redis')

class SessionSetup {
    constructor(core) {
        this.core = core

        return this.init()
    }

    init() {
        this
            .core
            .app
            .use(cookieParse())

        this
            .core
            .app
            .use(session({secret: 'Multi Payment Gateway', resave: false, saveUninitialized: true}))

        if (this.core.env.APP_ENV == 'production') {
            this
                .core
                .app
                .set('trust proxy', 1)
        }

        this.setupCache()

        return this.core
    }

    setupCache() {
        const redisCache = cacheManager.caching({store: redistStore, host: this.core.env.REDIS_HOST, port: this.core.env.REDIS_PORT, db: 0, ttl: 60000})

        redisCache
            .store
            .events
            .on('redisrror', (error) => {
                console.log(error)
            })

        this
            .core
            .make('cache', redisCache)
    }

}

module.exports = SessionSetup