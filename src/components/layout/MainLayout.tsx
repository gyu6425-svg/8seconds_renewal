import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-[180px] xl:pt-[248px]">
                <div className="page-inner mx-auto w-full max-w-[1700px] px-4 pb-10 md:px-8 md:pb-12 xl:px-0">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
