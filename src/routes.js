import { Router } from 'express';
import MessageController from './app/controllers/MessageController';

const routes = new Router();

routes.get('/messages', MessageController.index);

routes.post('/messagestring', MessageController.storeMessage);

routes.post('/messagenumber', MessageController.storeNumber);
export default routes;
