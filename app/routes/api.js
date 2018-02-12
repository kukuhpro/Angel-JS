module.exports = (Route) => {
    console.log(Route)
    return [
        Route.GET('/', {
            as: 'home.index',
            uses: 'site@index',
            middleware: ['apiAuthentication']
        }),
        Route.POST('/payment/request', {
            as: 'request.payment',
            uses: 'auth@requestPayment',
            middleware: ['ApiAuthentication'],
            validation: 'paymentRequest'
        }),
        Route.GET('/payment/charge', {
            as: 'charge.payment',
            uses: 'site@paymentCharge'
        }),
        Route.GROUP({'prefix': 'user', 'middleware': []}, (Route) => {
            return [
                Route.GET('/profile', {
                    as: 'user.profile'
                })
            ]
        })
    ]
}