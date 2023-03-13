import { ReactNode } from 'react'

import { Container } from '@mui/material'

import { HeaderBar } from "./HeaderBar"

const AppLayout = ({ content, title }: { content: ReactNode, title?: string }) => {

    return (
        <>
            <HeaderBar title={title} />
            <div style={{ margin: "30px" }}></div>
            <Container>
                {content}
            </Container>
        </>
    )
}

export { AppLayout }