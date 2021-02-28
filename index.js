'use strict';

const express = require('express');
const app = express();

app.set('HOST', process.env.SERVER_HOST || '127.0.0.1');
app.set('PORT', process.env.SERVER_PORT || 5000);

require('./src/boot')(__dirname, app)
    .then(() => {
        app.listen(app.get('PORT'), () => {
            console.log('%s 🌎 is running at http://%s:%s in %s mode', '✓', app.get('host'), app.get('port'), app.get('env'));
        });
    })
    .catch((err) => {        
        throw err;
    });