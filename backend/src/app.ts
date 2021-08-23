import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';
import UserService from 'src/modules/user/service';

import routesV1 from '@routes/v1';
import { Admin } from '@schemas/Admin';

const session = require('express-session');
const hash = require('pbkdf2-password')();

async function authenticate(username, password, fn) {
  if (!module.parent) console.log('authenticating %s:%s', username, password);

  const user = await UserService.findByUsername(username);

  if (!user) return fn(new Error('cannot find user'));

  hash({ password, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.password) return fn(null, user);
    fn(new Error('invalid password'));
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: 'shhhh, very secret',
      })
    );
    this.express.use(function (req: any, res, next) {
      const err = req.session.error;
      const msg = req.session.success;
      delete req.session.error;
      delete req.session.success;
      res.locals.message = '';
      if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
      if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
      next();
    });
  }

  private database(): void {
    connect('mongodb://mongodb:27017/floripa-tour', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('DB CONNECTED');

        Admin.find((err, admins) => {
          if (!admins.length) {
            // Cria um admin se estiver inicializando o sistema

            hash({ password: 'admin' }, function (err, pass, salt, hash) {
              if (err) throw err;

              const admin = new Admin({
                name: 'Admin',
                username: 'admin',
                password: hash,
                salt,
              });

              admin.save((err) => {
                if (err) console.log('err', err);
              });
            });
          }
        });
      })
      .catch(() => console.log('DB FAILED'));
  }

  private routes(): void {
    this.express.use('/v1', routesV1);

    this.express.get('/', function (req, res) {
      res.redirect('/login');
    });

    this.express.get('/restricted', restrict, function (req, res) {
      res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
    });

    this.express.get('/logout', function (req: any, res) {
      // destroy the user's session to log them out
      // will be re-created next request
      req.session.destroy(function () {
        res.redirect('/');
      });
    });

    this.express.get('/login', function (req, res) {
      res.send('Login!');
    });

    this.express.post('/login', function (req: any, res) {
      const { username, password } = req.body;

      authenticate(username, password, function (err, user) {
        if (user) {
          // Regenerate session when signing in
          // to prevent fixation
          req.session.regenerate(function () {
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = user;
            req.session.success =
              'Authenticated as ' +
              user.name +
              ' click to <a href="/logout">logout</a>. ' +
              ' You may now access <a href="/restricted">/restricted</a>.';
            res.redirect('back');
          });
        } else {
          req.session.error =
            'Authentication failed, please check your ' +
            ' username and password.' +
            ' (use "tj" and "foobar")';
          res.redirect('/login');
        }
      });
    });
  }
}

export default new App().express;
