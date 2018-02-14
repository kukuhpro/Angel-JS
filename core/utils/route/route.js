// helper for method GET routing
const GET = function (url, obj) {
    let urlobj = {
        url: url,
        method: 'get'
    }
    urlobj = Object.assign(urlobj, obj)
    return urlobj
}
// helper for method POST routing
const POST = function (url, obj) {
    let urlobj = {
        url: url,
        method: 'post'
    }
    urlobj = Object.assign(urlobj, obj)
    return urlobj
}

let methodRoute ={
    GET: GET,
    POST: POST
}

const GROUP = function(obj, callback) {
   let routes = callback(methodRoute)

    if (routes instanceof Array) {
        for (let index = 0; index < routes.length; index++) {
            let route = routes[index];
            if (obj.prefix) {
                route.url = obj.prefix + route.url
            }

            if (obj.middleware) {
                if (!route.middleware) {
                    route.middleware = obj.middleware
                } else {
                    route.middleware = route.middleware.concat(obj.middleware)
                }
            }

            routes[index] = route
        }
    }

   return routes
}

methodRoute["GROUP"] = GROUP

// export object on every method
module.exports = methodRoute
