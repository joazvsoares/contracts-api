import { Contract } from "../../models.js"
import { Op } from 'sequelize';

export class ContractService {

  async getContract(contractId, profileId) {
    return await Contract.findOne({
      where: {
        id: contractId,
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId },
        ]
      }
    })
  }

  async listContracts(profileId) {
    return Contract.findAll({ 
      where: {
        status: { [Op.ne]: 'terminated' },
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId },
        ]
      }
    })
  }

}