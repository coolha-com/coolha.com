'use client'
import { config } from '@/config/Wagmi'
import { type BaseError, useReadContracts, useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { coolhatopAPI } from './coolhatopAPI'
import { weiToDawei } from '@/utils/uint256to'
import { truncateEthAddress } from '@/utils/truncateEthAddress'
import { useEffect, useState } from 'react';

const coolhatopNFTContract = {
    address: '0xadb1d226eb9c36f6525c4a2cacce5882181d25ff',
    abi: coolhatopAPI,
    chainId: 20651,
} as const

export default function MintNFT() {
    const { isConnected, address } = useAccount({ config });
    const { data: hash, isPending: writeisPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })
    const { data, error, isPending } = useReadContracts({
        contracts: [
            {
                ...coolhatopNFTContract,
                functionName: 'balanceOf',
                args: [address as `0x${string}`],
            },
            { ...coolhatopNFTContract, functionName: 'currentPrice' },
            { ...coolhatopNFTContract, functionName: 'saleIsActive' },
            { ...coolhatopNFTContract, functionName: 'MAX_SUPPLY' },
            { ...coolhatopNFTContract, functionName: 'totalSupply' },
            { ...coolhatopNFTContract, functionName: 'walletLimit', },
            { ...coolhatopNFTContract, functionName: 'name', },
            { ...coolhatopNFTContract, functionName: 'symbol', },
            { ...coolhatopNFTContract, functionName: 'tokenURI'},
        ]
    });

    const [nextTokenId, setNextTokenId] = useState<string | null>(null);

    // 当 totalSupply 变化时，更新 nextTokenId
    useEffect(() => {
        if (data) {
            const totalSupply = data.find(contract => contract.result === 'totalSupply')?.result?.toString();
            if (totalSupply) {
                const nextId = BigInt(totalSupply) + BigInt(1);
                setNextTokenId(nextId.toString());
            }
        }
    }, [data]);

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const [balanceOf, currentPrice, saleIsActive, MAX_SUPPLY, totalSupply,walletLimit, name, symbol, tokenURI] = data.map(item => item.result?.toString());

    const priceInBigInt = currentPrice ? BigInt(currentPrice) : BigInt(0);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const tokenId = nextTokenId ? BigInt(nextTokenId) : BigInt(1); // 使用 nextTokenId
        writeContract({
            ...coolhatopNFTContract,
            functionName: 'mint',
            args: [tokenId],
            value: priceInBigInt, // 设定支付金额
        });
    }

    return (
        <div className='px-4 flex justify-center'>
            <div className="card w-96 bg-base-100 shadow-xl border ">
                <figure>
                    <img src={`https://gateway.pinata.cloud/ipfs/QmSVXYAnSmjcf3WxstTYft6E7ohQHStoPPcdtE4ScUFzCa`} alt="NFT" />
                </figure>
                <div>图片: {tokenURI && <img src={`https://gateway.pinata.cloud/${tokenURI}`} alt={tokenURI} />}{tokenURI}</div>
                <div className='text-error'>当前暂未部署，仅测试网</div>
                <div className="card-body border-t">
                    <div>名称: {name}</div>
                    <div>符号: {symbol}</div>
                    <div>合约地址: <a href={`https://www.oklink.com/zh-hans/polygon/address/${coolhatopNFTContract.address}`} className='link link-hover' target='_blank'>{truncateEthAddress(coolhatopNFTContract.address)}↗</a> </div>
                    <div>铸造价格: {currentPrice ? `${weiToDawei(currentPrice)}` : 'N/A'}</div>
                    <div>已铸造: {totalSupply}/{MAX_SUPPLY}</div>
                    <div>限量持有: {walletLimit}</div>
                    <div className="card-actions flex justify-between mt-4 ">
                        <button className='btn btn-primary btn-ghost'>{!isConnected ?(<p>未连接钱包</p>): (<p>账户拥有: {balanceOf}</p>)}</button>
                        <form onSubmit={submit}>
                            <button type="submit" disabled={isPending} className='btn btn-primary'>
                                {!saleIsActive ?
                                    (<span className="mt-2 text-red-500">未激活</span>)
                                    :
                                    (<span>{isPending ? '确认中...' : 'Mint NFT'}</span>)
                                }
                            </button>
                        </form>
                        {hash && <div>交易 Hash:
                            <a href={`https://explorer.buildbear.io/classical-kingpin-385d0670/tx/${hash}`} className='link link-hover' target='_blank'>{truncateEthAddress(hash)}↗</a>
                        </div>}
                        {isConfirming && <div>等待交易确认...</div>}
                        {isConfirmed && <div>交易成功.</div>}
                        {error && (<div>Error: {(error as BaseError).shortMessage || error}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
