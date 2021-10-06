const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.PW_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log(`\n\n******************************\n\n  NOW LISTENING ON PORT ${port}\n\n******************************\n\n`));
});