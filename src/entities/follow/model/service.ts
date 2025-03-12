import { FollowRepository } from '../api';

class FollowService {
  constructor(private followRepository: typeof FollowRepository) {
    this.followRepository = followRepository;
  }

  async follow(userId: string) {
    try {
      const result = await this.followRepository.createFollowerMember(userId);
      if (result !== 'OK') throw new Error('follow error');
      return result;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async unfollow(userId: string) {
    try {
      const result = await this.followRepository.createUnfollowerMember(userId);
      if (result !== 'OK') throw new Error('follow error');
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async updateMemberNickname(userId: string, nickname: string) {
    const { result } = await this.followRepository.findMemberNicknameExists(nickname);
    if (!result.isExist) {
      const result = await this.followRepository.putMemberNickname(userId, nickname);
      return result;
    }
    throw new Error(result.message);
  }
}

export default new FollowService(FollowRepository);
