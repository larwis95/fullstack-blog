const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHandleBars = require('express-handlebars');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET_KEY,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const handleBars = expressHandleBars.create({ helpers });

app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});