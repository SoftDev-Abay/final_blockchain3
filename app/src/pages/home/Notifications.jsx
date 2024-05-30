import React from 'react';

import NotificationCard from '../../components/NotificationCard';
import Spinner from '../../components/Spinner';
import { useBlog } from '../../context/Blog';
// mock data
const data = {
    visitors: [
        {
            _id: '1',
            visitorId: {
                _id: '1',
                name: 'John Doe',
                profilePicture: '',
            },
            visitedAt: new Date(),
        },
    ],
};

function Notifications() {
    const { user, request, userAccounts, acceptRequest } = useBlog();

    let content;

    const onSubmit = (key) => {
        acceptRequest(key);
    };

    console.log(request);

    const userRequests = request.reduce((acc, req) => {
        const currentUser = userAccounts.find(
            (user) => user.authority.PublicKey.toBase58() === req.PublicKey
        );

        return currentUser;
    }, []);

    // if (userRequests.length === 0) {
    //     content = (
    //         <div className="flex justify-center items-center mt-20">
    //             <p className="text-center text-gray-1">No notifications</p>
    //         </div>
    //     );
    // } else {
    //     content = (
    //         <div className="mt-14 flex flex-col gap-9">
    //             {userRequests.map((visitor, index) => (
    //                 <NotificationCard
    //                     key={
    //                         index +
    //                         visitor.account.name +
    //                         visitor.account.avatar
    //                     }
    //                     message={`${visitor.account.name} send you request`}
    //                     userImage={visitor.account.avatar}
    //                     publicKey={visitor.PublicKey}
    //                     onSubmit={onSubmit}
    //                 />
    //             ))}
    //         </div>
    //     );
    // }

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>
            {content}
        </section>
    );
}

export default Notifications;
