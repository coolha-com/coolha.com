'use client'
import { config } from "@/config/Wagmi";
import { Erc20, useCurrencies } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";

export default function page() {
  const { address } = useAccount({ config })
  const { data: currencies, error, loading } = useCurrencies();
  return (
    <div className="min-w-svh p-1 w-full">

      <div className="">
        <div className="mt-3">
          <b>设置超级跟随</b>
          <p>设置超级关注会让用户花费加密货币来关注您，这是一种很好的赚取方式，您可以随时更改金额和货币或禁用/启用它。</p>
        </div>

        <div className="mt-3">
          <p>选择货币</p>
          <select className="select select-bordered w-full">
            <option disabled selected>选择货币</option>
            {currencies && currencies.map((currency: Erc20) => (
              <option key={currency.address} className="hover">
                {currency.symbol}
                {/* {currency.address} */}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <p>代币数量</p>
          <input name="value" placeholder="关注此账户时需要的代币数量" required className="input input-bordered w-full "/>
        </div>

        <div className="mt-3">
          <p>收款地址</p>
          <input name="value" defaultValue={address ? `${address}` : ''} placeholder="收到代币的地址" required className="input input-bordered w-full " />
        </div>
      </div>

    </div>
  )
}
