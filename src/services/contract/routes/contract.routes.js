import { getContract, listContracts } from "../controllers/contract.controller.js"

export function setContractRoutes(app) {
  app.get('/contracts/:id', getContract);
  app.get('/contracts', listContracts);
}