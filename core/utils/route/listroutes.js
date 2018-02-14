const Route = require('./route')

class listroutes  {
    constructor(fileRoute) {
        this.fileRoute = fileRoute
        this.startRoutes = []
        this.endRoutes = []
    }

    /**
     * Processing for make starting routes from file route
     * 
     * @memberOf listroutes
     */
    setStartRoutes() {
        this.startRoutes = this.fileRoute(Route)
    }

    /**
     * Processing for getting final result for routings
     * 
     * @memberOf listroutes
     */
    setEndRoutes() {
        for (let index = 0; index < this.startRoutes.length; index++) {
            let route = this.startRoutes[index];
            if (route instanceof Array) {
                this.endRoutes = this.endRoutes.concat(route)
            } else if (route instanceof Object) {
                this.endRoutes.push(route)
            }
        }
    }


    /**
     * 
     * Get Result for array of routes
     * @returns 
     * 
     * @memberOf listroutes
     */
    getEndRoutes() {
        return this.endRoutes
    }
}


module.exports = listroutes