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
   const route = callback(methodRoute)
   return route
}

methodRoute["GROUP"] = GROUP

// export object on every method
module.exports = methodRoute
