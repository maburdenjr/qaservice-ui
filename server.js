'use strict';

const config = require('config');
const express = require('express');
const reactViews = require('express-react-views');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.use(cookieParser());
app.use(helmet());
app.use('/public', express.static(`${__dirname}/public`));

routes(app);

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(config.showFriendlyError ? "Internal server error" : err.message);
});

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}!`);
});
