import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export class Profile extends Sequelize.Model {
  isContractor() {
    return this.type === 'contractor';
  }
  isClient() {
    return this.type === 'client';
  }
  addBalance(amount, transaction) {
    this.balance += amount;
    return this.save({transaction});
  }
  reduceBalance(amount, transaction) {
    this.balance -= amount;
    return this.save({transaction});
  }
}

Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance:{
      type:Sequelize.DECIMAL(12,2)
    },
    type: {
      type: Sequelize.ENUM('client', 'contractor')
    }
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);
