import { ReactNode } from 'react'

import { Container } from '@mui/material'

import { HeaderBar } from "./HeaderBar"

const AppLayout = ({ content }: { content: ReactNode }) => {

    return (
        <>
            <HeaderBar />

            <Container>
                {content}
            </Container>
        </>
    )
}

export { AppLayout }