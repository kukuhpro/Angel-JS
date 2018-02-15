module.exports = (Route) => {
    return [
        Route.GET('/backoffice', {
            'as': 'form.login',
            'uses': 'auth@form'
        }),
        Route.POST('/backoffice/login', {
            'as': 'form.login.submit',
            'uses': 'auth@login',
            'validation': 'loginRequest'
        }),
        Route.GET('/dashboard', {
            'as': 'home.index',
            'uses': 'dashboard@home',
            'middleware': ['loginAuthentication']
        }),
        Route.GROUP({prefix: '/user'}, (Route) => {
            return [
                Route.GET('/kukuh-prabowo', {
                    as: 'user.profile',
                    uses: 'auth@form'
                })
            ]
        })
    ]
}