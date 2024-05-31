import React from 'react';
import NotificationCard from '../../components/NotificationCard';
import { useBlog } from '../../context/Blog';

function Notifications() {
    const { user, request, acceptRequest, getPersonByPublicKey } = useBlog();

    // Filtering valid requests from known user users

    if (!request) {
        return <p>Loading...</p>;
    }

    const userRequests = request
        .map((request) => {
            return getPersonByPublicKey(request.toBase58());
        })
        .filter((user) => user);

    console.log('userRequests', userRequests);

    let content;

    if (userRequests.length === 0) {
        content = (
            <div className="flex justify-center items-center mt-20">
                <p className="text-center text-gray-1">No notifications</p>
            </div>
        );
    } else {
        content = (
            <div className="mt-14 flex flex-col gap-9">
                {userRequests.map((user, index) => (
                    <NotificationCard
                        key={index + user.account.name + user.account.avatar}
                        message={`${user.account.name} sent you a request`}
                        userImage={user.account.avatar || 'defaultAvatarPath'}
                        publicKey={user.publicKey}
                        onSubmit={() => acceptRequest(user.publicKey)}
                        active={true}
                    />
                ))}
            </div>
        );
    }

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>
            {content}
        </section>
    );
}

export default Notifications;
