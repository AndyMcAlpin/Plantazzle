// Settings
app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    create({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./lib/handlebars"),
    }).engine
);
app.set("view engine", ".hbs");

