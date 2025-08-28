'use client'
import Footer from "@/app/(www)/_page/Footer";
import Header from "@/app/(www)/_page/Header";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaBtc, FaEthereum, FaCommentsDollar, FaDonate } from "react-icons/fa";
import { RiCodeBoxLine, RiBarChart2Line, RiLineChartLine, RiListCheck3, RiAdvertisementLine, RiApps2Line, RiFundsLine, RiNftLine } from "react-icons/ri";

export default function page() {
    const t = useTranslations("about_us");
    const Idea = [
        {
            name: t("mission"),
            description: t("mission_desc"),
            icon: FaBtc,
        },
        {
            name: t("vision"),
            description: t("vision_desc"),
            icon: FaEthereum,
        },
        {
            name: t("values"),
            description: t("values_desc"),
            icon: FaCommentsDollar,
        },
        {
            name: t("innovation"),
            description: t("innovation_desc"),
            icon: FaDonate,
        },
    ]
    const Bus = [
        {
            name: t("development"),
            description: t("development_desc"),
            icon: RiCodeBoxLine,
        },
        {
            name: t("market"),
            description: t("market_desc"),
            icon: RiBarChart2Line,
        },
        {
            name: t("marketing"),
            description: t("marketing_desc"),
            icon: RiLineChartLine,
        },
        {
            name: t("planning"),
            description: t("planning_desc"),
            icon: RiListCheck3,
        },
    ]
    const Case = [
        {
            name: t("digital_marketing"),
            description: t("digital_marketing_desc"),
            icon: RiNftLine,
        },
        {
            name: t("web3_application"),
            description: t("web3_application_desc"),
            icon: RiApps2Line,
        },
        {
            name: t("exposure_growth"),
            description: t("exposure_growth_desc"),
            icon: RiAdvertisementLine,
        },
        {
            name: t("brand_building"),
            description: t("brand_building_desc"),
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
                            {t("title")}
                        </h1>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl text-base-content ">
                            {t("subtitle")}
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-[#6a6a6a]">
                            <br />
                            {t("description1")}
                            <br />
                            {t("description2")}
                            <br />
                            {t("description3")}
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
                            {t("join_us")} ↗
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
                            {t("contact_us")} ↗
                        </Link>
                    </div>











                </div>
            </div>


            <Footer />

        </>
    )
}


