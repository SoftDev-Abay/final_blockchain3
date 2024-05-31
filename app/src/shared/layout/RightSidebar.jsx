import UserCard from '../../components/UserCard';
import { staticUsers } from '../../assets';
import { staticNotifications } from '../../assets';
import NotificationCard from '../../components/NotificationCard';
import { useBlog } from '../../context/Blog';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RightSidebar() {
    const { user, request, getPersonByPublicKey, userAccounts } = useBlog();

    const history = useHistory();

    // Filtering valid requests from known user users

    if (!request) {
        return <p>Loading...</p>;
    }

    let notificationsRequestsContent;

    const userRequests = request
        .map((request) => {
            return getPersonByPublicKey(request.toBase58());
        })
        .filter((user) => user);

    if (userRequests.length === 0) {
        notificationsRequestsContent = (
            <div className="flex justify-center items-center mt-20">
                <p className="text-center text-gray-1">No notifications</p>
            </div>
        );
    } else {
        notificationsRequestsContent = (
            <div className=" flex flex-col gap-9">
                {userRequests.map((user, index) => (
                    <NotificationCard
                        key={index + user.account.name + user.account.avatar}
                        message={`${user.account.name} sent you a request`}
                        userImage={user.account.avatar || 'defaultAvatarPath'}
                        publicKey={user.publicKey}
                        active={false}
                    />
                ))}
            </div>
        );
    }

    const transformedUserAccounts = userAccounts.map((user) => {
        const transUser = {
            ...user.account,
            publicKey: user.publicKey.toBase58(),
        };
        return transUser;
    });

    const onViewProfile = (id) => {
        history.push(`/user-profile/${id}`);
    };

    return (
        <section className="custom-scrollbar rightsidebar ">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">
                    Notifications
                </h3>
                <div className="mt-7 flex w-[350px] flex-col gap-10">
                    {staticUsers.length > 0 ? (
                        <>{notificationsRequestsContent}</>
                    ) : (
                        <p className="!text-base-regular text-light-3">
                            No users yet
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start mt-10">
                <h3 className="text-heading4-medium text-light-1">
                    Suggested Users
                    <div className="mt-7 flex w-[350px] flex-col gap-10">
                        {transformedUserAccounts
                            .slice(3)
                            .map((person, index) => (
                                <UserCard
                                    key={'person.id' + person.name + index}
                                    publicKey={person.publicKey}
                                    name={person.name}
                                    imgUrl={person.avatar}
                                    isFriend={false}
                                    onView={() =>
                                        onViewProfile(person.publicKey)
                                    }
                                />
                            ))}
                    </div>
                </h3>
            </div>
        </section>
    );
}

export default RightSidebar;
