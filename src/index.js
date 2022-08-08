import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import MemoryStore from 'memorystore';
const ourMemoryStore = MemoryStore(expressSession);
import passport from 'passport';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }

const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true});
mongoose.connection.once("open", ()=>{
    console.log("connected to Mongo DB");
})

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new ourMemoryStore(),
}));

app.use(passport.initialize());
app.use(passport.session());


import googleRoute from './routes/googleRoute.js'
import facebookRoute from './routes/facebookRoute.js'
import githubRoute from './routes/githubRoute.js'

app.use('/', cors(corsOptions), googleRoute);
app.use('/', cors(corsOptions), facebookRoute);
app.use('/', cors(corsOptions), githubRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server Started At " + PORT));