import { Contract } from './services/contract/models/contract.model.js';
import { Job } from './services/job/models/job.model.js';
import { Profile } from './services/profile/models/profile.model.js';

export * from './services/contract/models/contract.model.js';
export * from './services/job/models/job.model.js';
export * from './services/profile/models/profile.model.js';

Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)
