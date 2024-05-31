import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useBlog } from 'src/context/Blog';
import { useHistory } from 'react-router-dom';

function Topbar() {
    const history = useHistory();

    const { user } = useBlog();

    return (
        <nav className="topbar">
            <Link to="/" className="flex items-center gap-4">
                <img src="/assets/logo.svg" alt="logo" width={28} height={28} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">
                    Threads
                </p>
            </Link>

            <div className="flex gap-2">
                <div className="flex items-center gap-1">
                    <div className="block">
                        <div className="flex cursor-pointer">
                            <Link to={'/profile'}>
                                <div className="flex items-center">
                                    <img
                                        src={user?.avatar}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg';
                                        }}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
                                    />
                                    <p className="font-bold text-sm ml-2 capitalize">
                                        {user?.name}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="block md:hidden">
                        <div className="flex cursor-pointer" onClick={() => {}}>
                            <img
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Topbar;
