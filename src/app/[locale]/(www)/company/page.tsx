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
import {
  Card,
  CardIcon,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function page() {
  const t = useTranslations("company");
  const Idea = [
    { name: t("mission"), description: t("mission_desc"), icon: RiRocketLine },
    { name: t("vision"), description: t("vision_desc"), icon: RiEyeLine },
    { name: t("values"), description: t("values_desc"), icon: RiHeartLine },
    { name: t("innovation"), description: t("innovation_desc"), icon: RiFlashlightLine },
  ]
  const Bus = [
    { name: t("web3_dev"), description: t("web3_dev_desc"), items: t.raw("web3_dev_items"), icon: RiCodeSSlashLine },
    { name: t("rwa_solution"), description: t("rwa_solution_desc"), items: t.raw("rwa_solution_items"), icon: RiCoinsLine },
    { name: t("ai_growth"), description: t("ai_growth_desc"), items: t.raw("ai_growth_items"), icon: RiRobot2Line },
    { name: t("brand_strategy"), description: t("brand_strategy_desc"), items: t.raw("brand_strategy_items"), icon: RiBriefcase4Line },
  ]
  return (
    <>
      <div className="flex flex-col justify-center items-center py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* 介绍 */}
          <div className="mx-auto lg:text-center">
            <h1 className="mt-2 text-3xl text-primary drop-shadow-[1px_1px_1px_black] font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
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
          <div className="mx-auto max-w-2xl md:max-w-4xl mt-8">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 md:max-w-none md:grid-cols-2 lg:gap-y-8">
              {Idea.map((idea) => {
                const Icon = idea.icon
                return (
                  <Card key={idea.name}>
                    <div className="flex gap-4">
                      <CardIcon className="mb-0 shrink-0 size-12">
                        <Icon className="size-6" />
                      </CardIcon>
                      <div className="min-w-0">
                        <CardHeader className="mb-2">
                          <CardTitle className="text-primary text-2xl">{idea.name}</CardTitle>
                        </CardHeader>
                        <CardDescription className="text-foreground text-xl">
                          {idea.description}
                        </CardDescription>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <Button asChild size="lg" className="text-xl font-bold rounded-full">
              <Link href={'mailto:ceo@coolha.com'} target='_blank'>
                {t("join_us")} ↗
              </Link>
            </Button>
          </div>

          {/* 业务 */}
          <div className="mx-auto max-w-2xl md:max-w-4xl mt-40 grid grid-cols-1 md:grid-cols-2 gap-8">
            {Bus.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.name}>
                  <div className="flex gap-4">
                    <CardIcon className="mb-0 shrink-0 size-12">
                      <Icon className="size-6" />
                    </CardIcon>
                    <div className="min-w-0">
                      <CardHeader className="mb-2">
                        <CardTitle className="text-primary text-2xl">{item.name}</CardTitle>
                      </CardHeader>
                      <CardDescription className="text-muted-foreground text-base">
                        {item.description}
                      </CardDescription>
                      <CardContent className="mt-4">
                        <ul className="grid grid-cols-1 gap-2 text-lg text-foreground leading-7">
                          {item.items.map((it: string) => (
                            <li key={it} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
                              <span className="min-w-0">{it}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Button asChild size="lg" className="text-xl font-bold rounded-full">
              <Link href={'mailto:cs@coolha.com'} target='_blank'>
                {t("contact_us")} ↗
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}
