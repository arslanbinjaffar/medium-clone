
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <div className="p-8">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Provider