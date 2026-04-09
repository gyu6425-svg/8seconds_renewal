import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-[248px]">
                <div className="page-inner mx-auto w-[1700px] max-w-[1700px] pb-10 md:pb-12">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
