'use client'


export default function Page() {

  const faqItems = [
    {
      question: "什么是coolha?",
      answer: "coolha 是一个基于lens协议和区块链技术构建的去中心化社交媒体平台。它允许用户连接、共享内容和交互，同时保持对其数据和数字身份的控制。"
    },
    {
      question: "coolha 与传统社交媒体有何不同？",
      answer: "coolha 利用区块链技术为用户提供数据所有权、增强的隐私以及直接通过其内容获利的能力。与传统平台不同，coolha 不依赖中央机构来管理用户数据和交互。"
    },
    {
      question: "怎么才能使用 coolha 吗？",
      answer: "coolha基于Lens协议开发，您的EVM钱包需要拥有lens账户NFT登入。"
    },
    {
      question: "coolha 如何确保用户隐私？",
      answer: "coolha 使用去中心化身份解决方案和端到端加密进行消息传递。您的数据存储在分布式网络而不是集中式服务器上，因此您可以更好地控制自己的信息。"
    },
    {
      question: "我可以在 coolha 上赚钱吗？",
      answer: "是的，coolha 为用户提供了各种机会，让他们通过他们的内容和互动获利。这可能包括出售 NFT、接收加密货币小费或参与基于代币的治理系统。"
    }
  ]

  return (
    <div className=" bg-base-100 ">

      {/* Hero Section */}
      <section className="bg-[#C0E218] py-20">
        <div className="  mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">常见问题解答</h2>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="  mx-auto px-4">
          <div className="max-w-3xl mx-auto ">
            {faqItems.map((item, index) => (
              <div key={index} className="collapse collapse-plus bg-base-200 my-3">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">{item.question}</div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="  mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">仍有疑问？</h3>
          <p className="text-xl text-gray-600 mb-8">我们随时为您提供帮助。请联系我们的支持团队以获取更多信息。</p>
          <a href="mailto:fqa@coolha.com" target='_blank' className="inline-block bg-[#C0E218] text-gray-800 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300">
            客服支持
          </a>
        </div>
      </section>


    </div>
  )
}