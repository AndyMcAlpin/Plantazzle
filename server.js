global.__rootdir = __dirname
const { join } = require('path');
const express = require('express');
const session = require('express-session');
const sharedSession = require('express-socket.io-session')
const exphbs = require('express-handlebars');
const hb = require('handlebars')
const { Server } = require('socket.io')
const hbs = exphbs.create({});

const app = express();
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
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
hb.registerHelper('parseJson', (data, options) => {
    return options.fn(JSON.parse(data))
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
function addStatic(url, path) {
    return app.use(url, express.static(join(__rootdir, 'public', 'assets', path)))
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
addStatic('/css', 'stylesheets')
addStatic('/js', 'javascript')
addStatic('/images', 'images')



// SocketIO setup here.
const io = new Server(server)
io.use(sharedSession(sessionCreated, { autoSave:true }))
require('./controllers/ioEvents')(io)

app.use(require('./controllers'));

app.get('*', (req, res) => {
    return res.send('OH FACE-PLANT! This page does not exist!!!')
})
// app.use("/",require("./views/mike"))
// change name and location before finishing

sequelize.sync({ force: false, logging: false }).then(() => {
    server.listen(PORT, () => console.log('Server started'));
});