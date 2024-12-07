'use client'

import LayoutUse from "@/components/lnes/Data/u/LayoutUse"

export default function layout({ children, params: { users } }) {

    return (
        <LayoutUse users={users}>
            {children}
        </LayoutUse>

    )
}


