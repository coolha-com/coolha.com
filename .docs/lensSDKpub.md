Post: {
    __typename: "Post";
    by: Profile;<!-- 帖子的主用户 -->
    createdAt: string;<!-- 帖子创建的时间 -->
    globalStats: PublicationStats;<!-- 改用户的全部互动数据 -->
    hashtagsMentioned: string[];<!-- 提到的标签 -->
    id: PublicationId;<!-- 帖子的id -->
    isEncrypted: boolean;<!-- 是否加密 -->
    isHidden: boolean;<!-- 是否隐藏 -->
    metadata: ArticleMetadataV3 | AudioMetadataV3 | CheckingInMetadataV3 | EmbedMetadataV3 | EventMetadataV3 | ImageMetadataV3 | LinkMetadataV3 | LiveStreamMetadataV3 | MintMetadataV3 | SpaceMetadataV3 | StoryMetadataV3 | TextOnlyMetadataV3 | ThreeDMetadataV3 | TransactionMetadataV3 | VideoMetadataV3;
    momoka: MomokaInfo | null;<!-- 链下存储 -->
    openActionModules: (LegacyAaveFeeCollectModuleSettings | LegacyErc4626FeeCollectModuleSettings | LegacyFeeCollectModuleSettings | LegacyFreeCollectModuleSettings | LegacyLimitedFeeCollectModuleSettings | LegacyLimitedTimedFeeCollectModuleSettings | LegacyMultirecipientFeeCollectModuleSettings | LegacyRevertCollectModuleSettings | LegacySimpleCollectModuleSettings | LegacyTimedFeeCollectModuleSettings | MultirecipientFeeCollectOpenActionSettings | SimpleCollectOpenActionSettings | UnknownOpenActionModuleSettings)[];<!-- 打开的操作类型 -->
    operations: PublicationOperations;<!-- 操作 -->
    profilesMentioned: ProfileMentioned[];<!-- @到的账户id -->
    publishedOn: App | null;<!-- 在app发布的 -->
    referenceModule: DegreesOfSeparationReferenceModuleSettings | FollowOnlyReferenceModuleSettings | LegacyDegreesOfSeparationReferenceModuleSettings | LegacyFollowOnlyReferenceModuleSettings | UnknownReferenceModuleSettings | null;<!-- 其他操作模块 -->
    stats: PublicationStats;<!-- 帖子数据 -->
    txHash: string | null;<!-- 链上txHash -->
}

Quote: {
    __typename: "Quote";
    hashtagsMentioned: string[];
    profilesMentioned: ProfileMentioned[];
    quoteOn: CommentFields | Post | QuoteFields;
} & QuoteFields

Mirror: {
    __typename: "Mirror";
    by: Profile;
    createdAt: string;
    id: PublicationId;
    isHidden: boolean;
    mirrorOn: Comment | Post | Quote;
    momoka: MomokaInfo | null;
    publishedOn: App | null;
    txHash: string | null;
}

Comment: {
    __typename: "Comment";
    commentOn: CommentFields | Post | QuoteFields;
    firstComment: CommentFields | null;
    hashtagsMentioned: string[];
    profilesMentioned: ProfileMentioned[];
} & CommentFields