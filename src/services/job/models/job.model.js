import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export class Job extends Sequelize.Model {
  pay(transaction) {
    this.paid = true;
    this.paymentDate = new Date();
    return this.save({transaction});
  }
}

Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price:{
      type: Sequelize.DECIMAL(12,2),
      allowNull: false
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default:false
    },
    paymentDate:{
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);
