'use client'
import Footer from "@/app/(www)/_page/Footer";
import Header from "@/app/(www)/_page/Header";
import Link from "next/link";
import React from "react";
import { FaBtc, FaEthereum, FaCommentsDollar, FaDonate } from "react-icons/fa";
import { RiCodeBoxLine, RiBarChart2Line, RiLineChartLine, RiListCheck3, RiAdvertisementLine, RiApps2Line, RiFundsLine, RiNftLine } from "react-icons/ri";

export default function page() {
    const Idea = [
        {
            name: '使命',
            description: '为推动互联网进步和世界文明进步，创造激动人心的产品服务，让世界变得更好',
            icon: FaBtc,
        },
        {
            name: '愿景',
            description: '让数据信息可拥有、可信任、有价值',
            icon: FaEthereum,
        },
        {
            name: '价值观',
            description: '始终以用户为核心，不希望利益化和过度金融化，所有权益公平',
            icon: FaCommentsDollar,
        },
        {
            name: '技术创新',
            description: '致力于不断探索和应用前沿技术,提供更好的Web3产品和服务解决方案。',
            icon: FaDonate,
        },
    ]
    const Bus = [
        {
            name: '开发',
            description: 'DAPP、前端网站、EVM智能合约solidify、UI/UX设计、产品架构，区块链应用技术',
            icon: RiCodeBoxLine,
        },
        {
            name: '市场',
            description: '市场研究报告,数据分析,技术研究文章等',
            icon: RiBarChart2Line,
        },
        {
            name: '营销',
            description: '广告流量,NFT营销方案等技术,为创作者和企业提供创收方案',
            icon: RiLineChartLine,
        },
        {
            name: '策划',
            description: 'Web3商业模式研究，为您提供市场研究、营销策划方案、内容创意、品牌策划、企业形象设计等',
            icon: RiListCheck3,
        },
    ]
    const Case = [
        {
            name: '数字营销方案',
            description: '基于区块链技术发行数字资产，增强品牌忠诚度和创造独特价值，为用户和品牌建立更紧密的联系',
            icon: RiNftLine,
        },
        {
            name: 'Web3应用场景落地',
            description: 'Dapp开发，链上智能合约开发，web3项目网站。结合业务场景需求，定制开发',
            icon: RiApps2Line,
        },
        {
            name: '曝光和增长',
            description: '平台垂直广告，精准营销。为品牌调研和内容策划，增强消费者和粉丝粘性。',
            icon: RiAdvertisementLine,
        },
        {
            name: '品牌建设与推广',
            description: '策划品牌活动，品牌推广策略，品牌形象设计',
            icon: RiFundsLine,
        },
    ]
    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center  py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">




                    {/* 介绍 */}
                    <div className="mx-auto  lg:text-center">
                        <h1 className="mt-2 text-3xl text-primary drop-shadow-[1px_1px_1px_black] font-bold tracking-tight  sm:text-5xl">
                            {'酷哈实验室'}
                        </h1>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl text-base-content ">
                            {'让数据信息可拥有、可信任、有价值'}
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-[#6a6a6a]">
                            <br />
                            {'希望通过技术改变生产关系，为世界文明进步做贡献，让世界变得更好'}
                            <br />
                            {'相信Web3和区块链发展至今不仅仅是技术和互联网进步，更是一种能延伸到各领域的积极理念'}
                            <br />
                            {'公共区块链是世界大同、世界人民大团结、民主治理、解决信任的一项重要技术。'}
                        </p>
                    </div>

                    {/* 理念 */}
                    <div className="mx-auto  max-w-2xl md:max-w-4xl mt-8">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 md:max-w-none md:grid-cols-2 lg:gap-y-8">
                            {Idea.map((idea) => (
                                <div key={idea.name} className="relative pl-20 shadow-md p-6  rounded-2xl border bg-base-100 hover:border-primary ">
                                    <div className=" text-2xl font-semibold leading-7 text-info ">
                                        <div className="absolute left-5 top-7 flex h-10 w-10 items-start  rounded-2xl ">
                                            <idea.icon className="h-6 w-6 " aria-hidden="true" />
                                        </div>
                                        <span >  {idea.name}</span>
                                    </div>
                                    <span className="mt-2 text-xl text-base-content leading-7">{idea.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className=" mt-14 flex justify-center ">
                        <Link href={'mailto:ceo@coolha.com'} role="button" target='_blank' className="  btn btn-primary    text-xl  font-bold rounded-full ">
                            {'加入我们'} ↗
                        </Link>
                    </div>






                    {/* 业务 */}
                    <div className="mx-auto max-w-2xl md:max-w-4xl mt-40 grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {Bus.map((item) => (
                            <div key={item.name} className="rounded-2xl relative shadow-md bg-base-100 border h-auto p-6 pl-20 hover:border-primary">
                                <dt className=" text-2xl font-semibold leading-7 text-info  ">
                                    <div className="absolute left-5 top-7 flex h-10 w-10 items-start  rounded-2xl ">
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <span>  {item.name}</span>
                                </dt>
                                <dd className="mt-2 text-xl text-base-content leading-7 ">{item.description}</dd>
                            </div>
                        ))}
                    </div>


                    {/* 案例 */}
                    <div className="mx-auto max-w-2xl  md:max-w-4xl mt-8">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 md:max-w-none md:grid-cols-2 lg:gap-y-8">
                            {Case.map((cases) => (
                                <div key={cases.name} className="relative pl-20 shadow-md p-6  rounded-2xl border bg-base-100 hover:border-primary ">
                                    <div className=" text-2xl font-semibold leading-7 text-info  ">
                                        <div className="absolute left-5 top-7 flex h-10 w-10 items-start text-info rounded-2xl ">
                                            <cases.icon className="h-6 w-6 " aria-hidden="true" />
                                        </div>
                                        <span>  {cases.name}</span>
                                    </div>
                                    <span className="mt-2 text-xl  text-base-content leading-7 ">{cases.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-14 flex justify-center ">
                        <Link href={'mailto:cs@coolha.com'} role="button" target='_blank' className="  btn btn-primary    text-xl  font-bold rounded-full "   >
                            {'联系我们'} ↗
                        </Link>
                    </div>











                </div>
            </div>


            <Footer />

        </>
    )
}


