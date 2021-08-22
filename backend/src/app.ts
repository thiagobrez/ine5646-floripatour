import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';

import routesV1 from '@routes/v1';
import { Admin } from '@schemas/Admin';

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

            const admin = new Admin({
              name: 'Admin',
              password: 'admin',
              username: 'admin',
            });

            admin.save((err) => {
              if (err) console.log('err', err);
            });
          }
        });
      })
      .catch(() => console.log('DB FAILED'));
  }

  private routes(): void {
    this.express.use('/v1', routesV1);
  }
}

export default new App().express;
