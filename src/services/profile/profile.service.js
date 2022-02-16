import { Job, Profile, Contract } from "../../models.js"
import { sequelize } from '../../config/database.js';
import { Op } from 'sequelize';

export class ProfileService {

  async makeDeposit(userId, amount) {
    const profile = await Profile.findOne({ where: { id: userId } })
    const jobsToPay = await Job.findOne({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalAmount']],
      where: {
        paid: null,
        '$Contract.ClientId$': userId,
      },
      include: [{
        model: Contract, as: 'Contract', required: true
      }]
    })

    const maxAmountAllowed = jobsToPay.dataValues.totalAmount * 0.25;

    if (amount <= maxAmountAllowed) {
      await profile.addBalance(amount);
      return { balance: profile.balance }
    } else {
      throw new Error('The amount exceeds the max allowed')
    }
  }

  async getBestProfession(startDate, endDate) {
    const result = await Job.findOne({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
      where: {
        paid: true, 
        paymentDate: {
          [Op.between]: [startDate, endDate],
        }
      },
      include: [
        {
          model: Contract, as: 'Contract', required: true,
          include: [{ model: Profile, as: 'Contractor', required: true }]
        },

      ],
      group: ['Contract.Contractor.profession'],
      order: sequelize.literal('total DESC')
    })

    if (!result) {
      return { message: 'No result found' };
    }

    return { profession: result.Contract.Contractor.profession };
  }

  async getBestClients(startDate, endDate, limit = 2) {
    const results = await Job.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPaid']],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [startDate, endDate],
        }
      },
      include: [
        {
          model: Contract, as: 'Contract', required: true,
          include: [{ model: Profile, as: 'Client', required: true }]
        },
      ],
      group: ['Contract.Client.id', 'Contract.Client.firstName', 'Contract.Client.lastName'],
      order: sequelize.literal('totalPaid DESC'),
      limit
    })

    if (!results || !results.length) {
      return { message: 'No results found' };
    }

    return results.map((item) => {
      return {
        id: item.Contract.Client.id,
        fullName: `${item.Contract.Client.firstName} ${item.Contract.Client.lastName}`,
        paid: item.dataValues.totalPaid
      }
    });
  }
}
