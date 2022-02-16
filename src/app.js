import express from 'express';
import bodyParser from 'body-parser';
import { getProfile } from './services/profile/middlewares/get-profile.js';
import { setJobRoutes } from './services/job/routes/job.routes.js';
import { setContractRoutes } from './services/contract/routes/contract.routes.js';
import { setProfileRoutes } from './services/profile/routes/profile.routes.js';

export const app = express();

app.use(bodyParser.json());
app.use(getProfile)

setProfileRoutes(app);
setContractRoutes(app);
setJobRoutes(app);
