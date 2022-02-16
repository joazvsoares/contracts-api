import { JobService } from "../job.service.js"

export async function getUnpaidJobs(req, res) {
  const service = new JobService();
  service.getUnpaidJobs(req.profile)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    })
}

export async function payJob(req, res) {
  const { job_id } = req.params;

  const service = new JobService();
  service.payJob(req.profile, job_id)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}
