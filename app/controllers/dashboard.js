const Controller = require('./controller')

class DashboardController extends Controller {
    home() {
        return this
            .res
            .render('site/home')
    }
}

module.exports = DashboardController