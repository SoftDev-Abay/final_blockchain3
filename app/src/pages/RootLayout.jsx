import React from 'react';
import Topbar from '../shared/layout/Topbar';
import LeftSidebar from '../shared/layout/LeftSidebar';
import RightSidebar from '../shared/layout/RightSidebar';
import Bottombar from '../shared/layout/Bottombar';
import RequireAuth from '../components/RequireAuth';
const RootLayout = ({ children }) => {
    return (
        <RequireAuth>
            <div>
                <Topbar />
                <main className="flex flex-row">
                    <LeftSidebar />

                    <section className="main-container">
                        <div className="w-full max-w-4xl">{children}</div>
                    </section>

                    <RightSidebar />
                </main>
                {/* <Bottombar /> */}
            </div>
        </RequireAuth>
    );
};

export default RootLayout;
