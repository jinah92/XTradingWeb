const prefix = {
  v1: '/api/members',
} as const;

export const membersSegments = {
  memberId: ':memberId',
};

export const membersPaths = {
  memberById: `${prefix.v1}/${membersSegments.memberId}/base-info`,
  userBlockToggle: `${prefix.v1}/toggle-block`,
} as const;
