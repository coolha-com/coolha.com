'use client'
import { useState } from "react";

export default function SubscriptionComparison() {
  const [billingCycle, setBillingCycle] = useState("monthly");



  const plans = [
    {
      name: "专业会员",
      price: { monthly: 2, yearly: 22 },
      features: ["基本分析工具", "绿色会员标识"]
    },
    {
      name: "商业会员",
      price: { monthly: 9, yearly: 99 },
      features: ["高级分析工具", "金色会员标识", "商业仪表盘许可", "链上商店", "推广", "专属客户支持", "团队协作功能"]
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-100 h-svh">

      <h1>暂未推出，模拟测试</h1>

      <div role="tablist" className="tabs tabs-boxed mb-2 max-w-xs">
        <button role="tab"
          className={` tab ${billingCycle === "monthly" ? " tab-active" : ""}`}
          onClick={() => setBillingCycle("monthly")}
        >
          按月支付
        </button>
        <button role="tab"
          className={` tab ${billingCycle === "yearly" ? " tab-active" : ""}`}
          onClick={() => setBillingCycle("yearly")}
        >
          按年支付
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-6 rounded-2xl shadow-lg flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
          <p className="text-4xl font-bold mb-4">${plan.price[billingCycle]} / {billingCycle === "monthly" ? "月" : "年"}</p>
          <ul className="mb-4 flex-grow">
            {plan.features.map((feature) => (
              <li key={feature}>✔ {feature}</li>
            ))}
          </ul>
          <button className="btn btn-primary w-full mt-auto">订阅</button>
        </div>
        ))}
      </div>
    </div>
  );
}