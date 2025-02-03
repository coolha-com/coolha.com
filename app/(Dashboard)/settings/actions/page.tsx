'use client'
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll';
import { formatDate } from '@/utils/formatDate';
import { AddressTruncate } from '@/utils/AddressTruncate';
import { useProfileActionHistory, LimitType } from '@lens-protocol/react-web';

export default function ActionHistory() {
  const { data, loading, error, hasMore, observeRef } = useInfiniteScroll(useProfileActionHistory());

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>txHash</th>
              {/* <th>Id</th> */}
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{actionTypeMapping[item.actionType] || item.actionType}</td>
                <td>{formatDate(item.actionedOn)}</td>
                <td>{AddressTruncate(item.txHash ? item.txHash : '')}</td>
                {/* <td>{item.id}</td> */}
                <td>{AddressTruncate(item.who)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }
    </div >
  );
}
const actionTypeMapping = {
  ACTED: '操作',
  BLOCKED: '阻止',
  COLLECTED: '已收集',
  Comment: '评论',
  FOLLOW: ' 关注',
  LINK_HANDLE: '链接Lens',
  LOGGED_IN: '登录',
  MIRROR: '转发',
  POST: '发布帖子',
  QUOTE: '引用',
  REFRESH_AUTH_TOKEN: '刷新身份验证令牌',
  SET_PROFILE_METADATA: '编辑资料',
  SET_PROFILE_MODULE: '设置配置文件模块',
  UNBLOCKED: '取消阻止',
  UNFOLLOW: '取消关注',
  UNLINK_HANDLE: '取消链接Lens',
};
