const routename = function (core) {
    const setRoute = (routename, url) => {
        const objectRouteName = core.app.locals.AllRouteName
        if (!objectRouteName) {
            core.app.locals.AllRouteName = {}
            core.app.locals.AllRouteName[routename] = url
        } else {
            objectRouteName[routename] = url
            core.app.locals.ç = objectRouteName
        }
    }

    const helperurl = {
        route: (routename) => {
            return core.app.locals.AllRouteName[routename]
        },
        to: (url) => {
            return core.env.APP_URL + "/" + url
        }
    }

    return {setRoute: setRoute, helperurl: helperurl}
}

module.exports = routename