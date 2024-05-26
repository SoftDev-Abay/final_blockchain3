import React from 'react';

import NotificationCard from '../../components/NotificationCard';
import PulseLoader from 'react-spinners/PulseLoader';
import { useGetVisitorsQuery } from '../../features/notifications/friendsApiSlice';
function Notifications() {
    const { data, error, isLoading, isSuccess } = useGetVisitorsQuery();

    let content;

    if (isLoading) {
        content = (
            <div className="flex justify-center items-center mt-20">
                <PulseLoader color="#4F46E5" />
            </div>
        );
    }

    if (error) {
        content = <div>Error: {error.message}</div>;
    }

    console.log(data);

    if (isSuccess) {
        if (data.visitors.length === 0) {
            content = (
                <div className="flex justify-center items-center mt-20">
                    <p className="text-center text-gray-1">No notifications</p>
                </div>
            );
        } else {
            content = (
                <div className="mt-14 flex flex-col gap-9">
                    {data.visitors.map((visitor) => (
                        <NotificationCard
                            key={visitor._id}
                            id={visitor.visitorId._id}
                            message={`${visitor.visitorId.name} visited your profile`}
                            date={visitor.visitedAt}
                            userImage={visitor.visitorId.profilePicture}
                            href={`/user-profile/${visitor.visitorId._id}`}
                        />
                    ))}
                </div>
            );
        }
    }

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>
            {content}
        </section>
    );
}

export default Notifications;
