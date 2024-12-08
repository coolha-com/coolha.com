'use client'
import { Erc20, useCurrencies, LimitType } from '@lens-protocol/react-web';
import { config } from '@/config/Wagmi'
import { useAccount, useBalance } from 'wagmi'
import { useInfiniteScroll } from '@/components/lnes/Data/u/hook/useInfiniteScroll';
import { polygon } from 'wagmi/chains';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import LoadingSpinner from '@/gui/LoadingSpinner';

export default function Token() {
  const { isConnected, address } = useAccount({ config });

  // 获取支持的 ERC20 代币
  const { data: currencies, error, loading, hasMore, observeRef } = useInfiniteScroll(useCurrencies({
    limit: LimitType.Ten // 限制获取的代币数量
  }));

  // 渲染加载状态或错误信息
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error listing currencies: {error.message}</p>;

  return (
    <div>
      <div className="overflow-x-auto bg-base-100 ">
        <table className="table table-md">
          <thead>
            <tr>
              <th>logo</th>
              <th>代币</th>
              <th>合约地址</th>
              <th>余额</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency: Erc20) => (
              <CurrencyRow key={currency.symbol} currency={currency} Address={address as `0x${string}`} />
            ))}
            {hasMore && (
              <div className="flex justify-center my-4">
                <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CurrencyRow 组件，用于展示每个代币的信息
function CurrencyRow({ currency, Address }: { currency: Erc20, Address: string }) {
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: `0xcd284038f2e68c6a43b04695f84377f38686ee56`,
    token: currency.address as `0x${string}`, // 使用代币的合约地址
    chainId: polygon.id // 使用 Polygon 链 ID
  });

  // 格式化余额
  const formattedBalance = isBalanceLoading ? <LoadingSpinner /> : balanceData?.value ? balanceData?.value : '00';

  return (
    <tr className="hover">
      <td>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt={currency.symbol} />
          </div>
        </div>
      </td>
      <td>{currency.symbol}</td>
      <td>{truncateEthAddress(currency.address)}</td>
      <td>{formattedBalance}</td>
    </tr>
  );
}
