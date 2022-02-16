import { getBestClients, getBestProfession, makeDeposit } from "../controllers/profile.controller.js";

export function setProfileRoutes(app) {
  app.post('/balances/deposit/:userId', makeDeposit);
  app.get('/admin/best-profession', getBestProfession);
  app.get('/admin/best-clients', getBestClients);
}
