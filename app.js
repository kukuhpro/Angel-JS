const app = require('./core')

// Setup new class of application
let application = new app()

// setup all application setting with calling run function
application.run()

// serve this application to http server with port that been defined on .env
application.serve()