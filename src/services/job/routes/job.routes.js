import { getUnpaidJobs, payJob } from "../controllers/job.controller.js";

export function setJobRoutes(app) {
  app.post('/jobs/:job_id/pay', payJob);
  app.get('/jobs/unpaid', getUnpaidJobs);
}
