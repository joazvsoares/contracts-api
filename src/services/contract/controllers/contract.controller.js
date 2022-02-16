import { ContractService } from "../contract.service.js"

export async function getContract(req, res) {
  const { id } = req.params

  const service = new ContractService();
  service.getContract(id, req.profile.id).
    then(contract => {
      if (!contract) return res.status(404).end()
      res.json(contract);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

export async function listContracts(req, res) {
  const service = new ContractService();
  service.listContracts(req.profile.id)
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}
