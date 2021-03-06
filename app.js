if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();

}

console.log(process.env.API_SECRET);
// console.log(process.env.API_KEY);

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Review = require('./models/reviews');
const mongoSanitize = require('express-mongo-sanitize');


const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');


mongoose.connect('mongodb://localhost:27017/Yelcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("Database connected");
});



app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())





const sessionconfig = {
    name: 'session',
    secret: 'lalaland',
    resave: false,
    saveUninitialized: true,
    cookies: {
       HttpOnly: true,
       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
       maxAge: 1000 * 60 * 60 * 24 * 7
    }

}

app.use(session(sessionconfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.get('/fakeuser', async (req, res) => {
    const user = new User({ email: 'nate@gmail.com', username: 'nate'})
    const newuser = await User.register(user, 'money');
    res.send(newuser)


})

app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)


app.get('/', (req, res) => {
  res.render('home')
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))

})

app.use((err, req, res, next) => {
   const { statusCode = 500 } =err;
   if(!err.message) err.message = 'oh no something went wrong'
   res.status(statusCode).render('error', { err })
})

app.listen(3000, ()=> {
  console.log('on port 3000');
})







// app.get('/mycamp', async (req, res) => {
//   const camp = new Campground({ title: 'my backyard', description: 'advantures camping'});
//   await camp.save();
//   res.send(camp)
// })
