const express = require('express');
const path    = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const adminRoutes = require('./routes/admin');
const protectRoutes = require('./middlewares/route-protect.middleware');




const app = express();
 

 
// Statické súbory
app.use(express.static(path.join(__dirname, "public")));
// Nastavenie view enginu
app.set("view engine", "ejs");
// Middleware na spracovanie formulárov
app.use(express.urlencoded({ extended: true }));
 
// Konfigurácia session
const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "heslo",
    database: "career_portal",
};
const sessionStore = new MySQLStore(options);
app.use(
    session({
        secret: "superSecret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);
 
// Middleware na nastavenie isAuth
app.use((req, res, next) => {
    const user = req.session.user;
    if(!user){
        return next();    
    }
    res.locals.isAuth = true;
    res.locals.user = {...req.session.user};
    next();
});

const appData = require('./util/app-data');

// Tesne pred prvým route-handlerom:
(async () => {
  try {
    await appData.ensureSchemaAndSeeds();
    console.log('DB schema OK');
  } catch (err) {
    console.error('Chyba pri inicializácii DB:', err);
  }
})();
 
// Routy
/*app.use("/", require("./routes/public"));
app.use("/", require("./routes/defaults"));
//app.use(protectRoutes);
app.use("/", require("./routes/subscriptions"));
app.use("/", require("./routes/jobsRoute"));

app.use("/admin", require("./routes/admin"));*/

// verejné routy
app.use('/', require('./routes/public'));
app.use('/', require('./routes/defaults'));
app.use('/', require('./routes/subscriptions'));
app.use('/', require('./routes/jobsRoute'));

// **admin sekcia**
app.use('/admin', adminRoutes);



// Chybový middleware 500
app.use((error, req, res, next) => {
    console.error("Render error:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).render("500");
});
 
// Chybový middleware 404
app.use((req, res) => {
    res.status(404).render("404");
});
 
// Chybový middleware 401 - Nezaregistrovaný
app.use((req, res) => {
    res.status(401).render("401");
});

// Chybový middleware 401 - Neautorizovaný
app.use((req, res) => {
    res.status(403).render("403");
});
 
 
app.listen(3001);