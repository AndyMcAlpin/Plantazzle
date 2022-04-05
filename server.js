const path = require('path');
const express = require('express');
const session = require('express-session');
const sharedSession = require('express-socket.io-session')
const exphbs = require('express-handlebars');
const { Server } = require('socket.io')
const hbs = exphbs.create({});

const app = express();
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const req = require('express/lib/request');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'replaceme',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const sessionCreated = session(sess)
app.use(sessionCreated);


// helpers here

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// SocketIO setup here.
const io = new Server(server)
io.use(sharedSession(sessionCreated, { autoSave:true }))
require('./controllers/ioEvents')(io)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/js', express.static(path.join(__dirname, 'public/javascript')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));

app.use(require('./controllers/'));
app.use("/",require("./views/mike"))



sequelize.sync({ force: false, logging: false }).then(() => {
    server.listen(PORT, () => console.log('Server started'));
});