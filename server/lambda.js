import serverlessExpress from '@codegenie/serverless-express';
import { createApp } from './src/app.js';

const app = createApp();

export const handler = serverlessExpress({ app });