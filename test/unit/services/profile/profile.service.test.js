import { Job, Profile } from "../../../../src/models.js";
import { ProfileService } from "../../../../src/services/profile/profile.service.js"

describe('test ProfileService class', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should properly validate the amount', async () => {
    const findOneProfile = jest.spyOn(Profile, 'findOne')
      .mockResolvedValue(new Profile())

    const findOneJob = jest.spyOn(Job, 'findOne')
      .mockResolvedValue({ dataValues: { totalAmount: 501 }})

    const save = jest.spyOn(Profile.prototype, 'save')
      .mockResolvedValue();

    const service = new ProfileService();
    await expect(service.makeDeposit(1, 2000)).rejects.toThrow('The amount exceeds the max allowed');
    expect(save).toHaveBeenCalledTimes(0);
  })

  it('should properly update the balance', async () => {
    const profile = new Profile();
    profile.balance = 2000;

    const findOneProfile = jest.spyOn(Profile, 'findOne')
      .mockResolvedValue(profile)

    const findOneJob = jest.spyOn(Job, 'findOne')
      .mockResolvedValue({ dataValues: { totalAmount: 2000 }})

    const save = jest.spyOn(Profile.prototype, 'save')
      .mockResolvedValue();

    const service = new ProfileService();
    await service.makeDeposit(1, 500);

    expect(findOneProfile).toHaveBeenCalledTimes(1);
    expect(findOneJob).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledTimes(1);
    expect(profile.balance).toStrictEqual(2500);
  })
})