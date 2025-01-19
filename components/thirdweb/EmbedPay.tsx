'use client'
import { createThirdwebClient } from "thirdweb";
import {  PayEmbed } from "thirdweb/react";
const client = createThirdwebClient({ clientId: process.env.THIRDWEB_CLIENT_ID ||''});
export default function EmbedPay() {
   return (
     <>
     <PayEmbed client={client} />
     </>
   )
}