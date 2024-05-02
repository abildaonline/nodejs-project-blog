const express = require('express');
const session = require("express-session");
const app = express();
const mongooseStore = require("connect-mongo");
const passport = require("passport");


require("./views/server/config/db");
require("./views/server/config/passport");

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

app.use(
    session({
        name: "blog.session",
        secret: "keyboard cat",
        maxAge: 1000 * 60 * 60 * 7,
        resave: false,
        store: mongooseStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017",
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(require("./views/server/pages/router"));
app.use(require("./views/server/Categories/router"));
app.use(require("./views/server/auth/router"));
app.use(require("./views/server/Blogs/router"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});