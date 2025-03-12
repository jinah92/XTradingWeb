import { FollowRepository } from '@/entities/follow';

import { MemberRepository } from '../api';
import { MemberViewModel } from '../model';

import type { UserInfo } from '@/entities/member/types';

class MemberService {
  constructor(
    private memberRepository: typeof MemberRepository,
    private followRepository: typeof FollowRepository,
  ) {
    this.memberRepository = memberRepository;
    this.followRepository = followRepository;
  }

  async getMemberBaseInfo(userId: string) {
    const userBaseInfo = await this.memberRepository.findMemberInfo(userId);
    const followers = await this.followRepository.findFollowers();
    const followees = await this.followRepository.findFollowees();

    return new MemberViewModel({ ...userBaseInfo, followers, followees } as UserInfo);
  }
}

export default new MemberService(MemberRepository, FollowRepository);
