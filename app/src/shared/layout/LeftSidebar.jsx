import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants/index';

function LeftSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) &&
                            link.route.length > 1) ||
                        pathname === link.route;

                    return (
                        <Link
                            to={link.route}
                            key={link.label}
                            className={`leftsidebar_link flex items-center ${
                                isActive
                                    ? 'bg-primary-500 rounded-md px-6 py-3'
                                    : ''
                            }`}
                            style={{
                                position: isActive ? 'relative' : 'static',
                                top: isActive ? '0' : 'auto',
                                left: isActive ? '0' : 'auto',
                            }}
                        >
                            <img
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <p className="text-light-1 max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default LeftSidebar;
