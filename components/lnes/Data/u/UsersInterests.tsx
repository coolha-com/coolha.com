'use client'

export default function UsersInterests({ profile }) {
    // 检查profile?.interests是否存在并且是一个字符串
    const Interests = profile?.interests && typeof profile.interests === 'string' ? profile.interests.split("__") : [];
    return (
        <TagList tags={Interests} />
    );
}


const Tag = ({ text }) => {
    return (
        <span className="inline-block bg-gray-200 rounded-full px-3 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {text}
        </span>
    );
};

// 标签列表组件
const TagList = ({ tags }) => {
    return (
        <div className="py-2 px-6">
            {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
            ))}
        </div>
    );
};