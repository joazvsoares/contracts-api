import { Job, Profile, Contract } from "../../models.js"
import { sequelize } from '../../config/database.js';
import { Op } from 'sequelize';

export class JobService {

  async getUnpaidJobs(profile) {
    const searchField = profile.isContractor()
      ? '$Contract.ContractorId$'
      : '$Contract.ClientId$';

    const jobs = await Job.findAll({
      where: {
        paid: null,
        [searchField]: profile.id,
        '$Contract.status$': { [Op.ne]: 'terminated' }
      },
      include: [{ model: Contract, as: 'Contract', required: true }]
    })

    if (!jobs || !jobs.length) {
      return { message: 'No results found' };
    }

    return jobs;
  }

  async payJob(profile, jobId) {
    if (!profile.isClient()) {
      throw new Error('The profile is not a client')
    }

    const transaction = await sequelize.transaction();

    try {
      const job = await Job.findOne({
        where: {
          id: jobId,
          paid: null,
          '$Contract.ClientId$': profile.id,
        },
        include: [{
          model: Contract, as: 'Contract', required: true
        }],
        lock: true
      })

      if (!job) {
        return { message: 'The job was not found or is already paid' };
      }

      const client = await Profile.findOne({ 
        where: { id: job.Contract.ClientId }, lock: true, transaction 
      });

      const contractor = await Profile.findOne({ 
        where: { id: job.Contract.ContractorId }, lock: true, transaction 
      });

      if (client.balance >= job.price) {
        await Promise.all([
          job.pay(transaction),
          client.reduceBalance(job.price, transaction),
          contractor.addBalance(job.price, transaction)
        ]);
        await transaction.commit();
      } else {
        throw new Error('The client does not have enough balance')
      }
      
      return job;

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
