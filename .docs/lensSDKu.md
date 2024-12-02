ProfileFields: {
    __typename: "Profile";
    createdAt: string;<!-- 账户创建的时间 -->
    followModule: FeeFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings | null;<!-- 关注模块 -->
    followNftAddress: NetworkAddress | null;<!-- 关注的NFT链上地址 -->
    globalStats: ProfileStats;<!-- 账户互动的全部数据 -->
    guardian: ProfileGuardianResult | null;<!-- 管理此账户的链上地址 -->
    handle: HandleInfo | null;<!-- 账户标识 -->
    id: ProfileId;<!-- 账户id -->
    interests: string[];<!-- 感兴趣的标签 -->
    invitesLeft: number;<!-- 邀请 左 -->
    metadata: ProfileMetadata | null;<!-- 账户的社交信息 -->
    onchainIdentity: ProfileOnchainIdentity;<!-- 链上身份 -->
    operations: ProfileOperations;<!-- 操作 -->
    ownedBy: NetworkAddress;<!-- 拥有者 -->
    peerToPeerRecommendedByMe: boolean;<!-- 我推荐的点对点 -->
    signless: boolean;<!-- 无符号 -->
    sponsor: boolean;<!-- 发起人 -->
    stats: ProfileStats;<!-- 帖子数据 -->
    txHash: string;<!-- 链上txHash -->
}


NetworkAddress: {
    __typename: "NetworkAddress";
    address: EvmAddress;
    chainId: number;
}


ProfileStats: {
    __typename: "ProfileStats";
    collects: number;
    comments: number;
    downvoted: number;
    downvotes: number;
    followers: number;
    following: number;
    id: ProfileId;
    lensClassifierScore: number | null;
    mirrors: number;
    posts: number;
    publications: number;
    quotes: number;
    upvoted: number;
    upvotes: number;
}


ProfileGuardianResult: {
    __typename: "ProfileGuardianResult";
    cooldownEndsOn: string | null;
    protected: boolean;
}


HandleInfo: {
    __typename: "HandleInfo";
    fullHandle: string;
    id: string;
    linkedTo: {
        contract: NetworkAddress;
        nftTokenId: string;
    } | null;
    localName: string;
    namespace: string;
    ownedBy: EvmAddress;
    suggestedFormatted: {
        full: string;
        localName: string;
    };
}


ProfileMetadata: {
    __typename: "ProfileMetadata";
    appId: AppId | null;
    attributes: {
        key: string;
        type: MetadataAttributeType;
        value: string;
    }[] | null;
    bio: string | null;
    coverPicture: ProfileCoverSet | null;
    displayName: string | null;
    picture: ProfilePicture_ImageSet_ | ProfilePicture_NftImage_ | null;
    rawURI: URI;
}
MetadataAttributeType(
Boolean: "BOOLEAN"
Date: "DATE"
Json: "JSON"
Number: "NUMBER"
String: "STRING"
)
ProfileCoverSet: {
    __typename: "ImageSet";
    optimized: Image | null;
    raw: Image;
    transformed: Image | null;
}
Image: {
    __typename: "Image";
    height: number | null;
    mimeType: string | null;
    uri: URI;
    width: number | null;
}


ProfileOnchainIdentity: {
    __typename: "ProfileOnchainIdentity";
    ens: {
        name: string | null;
    } | null;
    proofOfHumanity: boolean;
    sybilDotOrg: {
        source: {
            twitter: {
                handle: string | null;
            };
        } | null;
        verified: boolean;
    };
    worldcoin: {
        isHuman: boolean;
    };
}

ProfileOperations: {
    __typename: "ProfileOperations";
    canBlock: boolean;
    canFollow: TriStateValue;
    canUnblock: boolean;
    canUnfollow: boolean;
    hasBlockedMe: OptimisticStatusResult;
    id: ProfileId;
    isBlockedByMe: OptimisticStatusResult;
    isFollowedByMe: OptimisticStatusResult;
    isFollowingMe: OptimisticStatusResult;
}
TriStateValue(
    No: "NO"
    Unknown: "UNKNOWN"
    Yes: "YES"
)
OptimisticStatusResult: {
    __typename: "OptimisticStatusResult";
    isFinalisedOnchain: boolean;
    value: boolean;
}

ProfileStats: {
    __typename: "ProfileStats";
    collects: number;
    comments: number;
    downvoted: number;
    downvotes: number;
    followers: number;
    following: number;
    id: ProfileId;
    lensClassifierScore: number | null;
    mirrors: number;
    posts: number;
    publications: number;
    quotes: number;
    upvoted: number;
    upvotes: number;
}