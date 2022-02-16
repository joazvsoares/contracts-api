import { ProfileService } from "../profile.service.js"

export async function makeDeposit(req, res) {
  const { userId } = req.params;
  const { amount } = req.body;

  const service = new ProfileService();
  service.makeDeposit(userId, amount)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    })
}

export async function getBestProfession(req, res) {
  const { start, end } = req.query;

  const service = new ProfileService();
  service.getBestProfession(new Date(start), new Date(end))
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

export async function getBestClients(req, res) {
  const { start, end, limit } = req.query;

  const service = new ProfileService();
  service.getBestClients(new Date(start), new Date(end), limit)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}
