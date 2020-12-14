'use strict'

var app = require('./apps')
var port = 3000

        app.listen(port, () => {
            console.log(`Servidor corriendo en puerto ${port}`)
        });