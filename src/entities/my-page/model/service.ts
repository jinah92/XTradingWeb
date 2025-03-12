import { FollowRepository, NicknameRepository } from '@/entities/my-page';

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
}

class NicknameService {
  constructor(private repository: typeof NicknameRepository) {
    this.repository = repository;
  }

  async updateMemberNickname(userId: string, nickname: string) {
    const { result } = await this.repository.findMemberNicknameExists(nickname);
    if (!result.isExist) {
      const result = await this.repository.putMemberNickname(userId, nickname);
      return result;
    }
    throw new Error(result.message);
  }
}

export const followService = new FollowService(FollowRepository);
export const nicknameService = new NicknameService(NicknameRepository);
