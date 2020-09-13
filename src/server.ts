import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

const App = express();

App.use(cors());
App.use(express.json());
App.use(routes);

App.listen(3333);