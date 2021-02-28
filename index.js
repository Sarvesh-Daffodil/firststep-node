'use strict';

const express = require('express');
const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8090);

require('./src/boot')(__dirname, app)
    .then(() => {
        app.listen(app.get('port'), () => {
            console.log('%s 🌎 is running at http://%s:%s in %s mode', '✓', app.get('host'), app.get('port'), app.get('env'));
        });
    })
    .catch((err) => {        
        throw err;
    });