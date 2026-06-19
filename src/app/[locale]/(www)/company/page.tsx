'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    RiBriefcase4Line,
    RiCodeSSlashLine,
    RiCoinsLine,
    RiEyeLine,
    RiFlashlightLine,
    RiHeartLine,
    RiRobot2Line,
    RiRocketLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function page() {
    const t = useTranslations("company");
    const Idea = [
        {
            name: t("mission"),
            description: t("mission_desc"),
            icon: RiRocketLine,
        },
        {
            name: t("vision"),
            description: t("vision_desc"),
            icon: RiEyeLine,
        },
        {
            name: t("values"),
            description: t("values_desc"),
            icon: RiHeartLine,
        },
        {
            name: t("innovation"),
            description: t("innovation_desc"),
            icon: RiFlashlightLine,
        },
    ]
    const Bus = [
        {
            name: t("web3_dev"),
            description: t("web3_dev_desc"),
            items: t.raw("web3_dev_items"),
            icon: RiCodeSSlashLine,
        },
        {
            name: t("rwa_solution"),
            description: t("rwa_solution_desc"),
            items: t.raw("rwa_solution_items"),
            icon: RiCoinsLine,
        },
        {
            name: t("ai_growth"),
            description: t("ai_growth_desc"),
            items: t.raw("ai_growth_items"),
            icon: RiRobot2Line,
        },
        {
            name: t("brand_strategy"),
            description: t("brand_strategy_desc"),
            items: t.raw("brand_strategy_items"),
            icon: RiBriefcase4Line,
        },
    ]
    return (
        <>
            <div className="flex flex-col justify-center items-center  py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">




                    {/* 介绍 */}
                    <div className="mx-auto  lg:text-center">
                        <h1 className="mt-2 text-3xl text-primary drop-shadow-[1px_1px_1px_black] font-bold tracking-tight  sm:text-5xl">
                            {t("title")}
                        </h1>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl text-foreground ">
                            {t("subtitle")}
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-muted-foreground">
                            <br />
                            {t("description0")}
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
                                <Card key={idea.name} className="shadow-md p-6 rounded-2xl border bg-card hover:border-primary transition-colors">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 mt-1">
                                            <idea.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-semibold leading-7 text-primary">
                                                {idea.name}
                                            </div>
                                            <div className="mt-2 text-xl text-foreground leading-7">
                                                {idea.description}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className=" mt-14 flex justify-center ">
                        <Button asChild size="lg" className="text-xl font-bold rounded-full">
                            <Link href={'mailto:ceo@coolha.com'} target='_blank'>
                                {t("join_us")} ↗
                            </Link>
                        </Button>
                    </div>

                    {/* 业务 */}
                    <div className="mx-auto max-w-2xl md:max-w-4xl mt-40 grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {Bus.map((item) => (
                            <Card key={item.name} className="rounded-2xl shadow-md bg-card border h-auto p-6 hover:border-primary transition-colors">
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-2xl font-semibold leading-7 text-primary">
                                            {item.name}
                                        </div>
                                        <div className="mt-2 text-base text-muted-foreground leading-7">
                                            {item.description}
                                        </div>
                                        <ul className="mt-4 grid grid-cols-1 gap-2 text-lg text-foreground leading-7">
                                            {item.items.map((it) => (
                                                <li key={it} className="flex gap-3">
                                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
                                                    <span className="min-w-0">{it}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>


                    <div className="mt-14 flex justify-center ">
                        <Button asChild size="lg" className="text-xl font-bold rounded-full">
                            <Link href={'mailto:cs@coolha.com'} target='_blank'>
                                {t("contact_us")} ↗
                            </Link>
                        </Button>
                    </div>





                    {/* 团队介绍 */}




                </div>
            </div>



        </>
    )
}
