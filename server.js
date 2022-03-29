const exphbs = require('express-handlebars');
const { appendFile } = require('fs');
const hbs = exphbs.create({});

app.engine('handlebars' , hbs.engine);
app.set('view engine' , 'handlebars');