import { connected } from 'process';
import React from 'react';
import { useBlog } from 'src/context/Blog';
import { useHistory } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

const RequireAuth = ({ children }) => {
    const { user, initialized } = useBlog();
    const { connected, select } = useWallet();
    const history = useHistory();

    console.log('from require auth', connected, initialized, user);

    if (connected && initialized) {
        return <>{children}</>;
    } else {
        return (
            <div>
                You are not connected to the network. Please connect to the
                network to continue.
                <button
                    onClick={() => {
                        history.push('/auth/sign-up');
                    }}
                    className="
                    bg-primary-500  px-4 py-2 rounded-md text-white mt-4
                    "
                >
                    Sign In
                </button>
            </div>
        );
    }

    // {
    //     connected ? (
    //         <div className="flex items-center">
    //             <p className=" font-bold text-sm ml-2 capitalize underlinepink">
    //                 Home
    //             </p>
    //             <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
    //                 Blog
    //             </p>
    //             <img
    //                 src={user?.avatar}
    //                 alt="avatar"
    //                 className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
    //             />
    //             <p className=" font-bold text-sm ml-2 capitalize">
    //                 {user?.name}
    //             </p>
    //             {initialized ? (
    //                 <span>Logged in</span>
    //             ) : (
    //                 <Button
    //                     className="ml-3 mr-2"
    //                     onClick={() => {
    //                         initUser();
    //                     }}
    //                 >
    //                     Initialize User
    //                 </Button>
    //             )}
    //         </div>
    //     ) : (
    //         <Button
    //             loading={connecting}
    //             className="w-28"
    //             onClick={onConnect}
    //             leftIcon={
    //                 <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-5 w-5 mr-1"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                 >
    //                     <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    //                     />
    //                 </svg>
    //             }
    //         >
    //             Connect
    //         </Button>
    //     );
    // }
};

export default RequireAuth;
