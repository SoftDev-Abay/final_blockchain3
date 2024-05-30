import UserCard from '../../components/UserCard';
import { staticUsers } from '../../assets';
import { staticNotifications } from '../../assets';
import NotificationCard from '../../components/NotificationCard';

function RightSidebar() {
    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">
                    Notifications
                </h3>
                <div className="mt-7 flex w-[350px] flex-col gap-10">
                    {staticUsers.length > 0 ? (
                        <>
                            {staticNotifications
                                .slice(2)
                                .map((notification) => (
                                    <NotificationCard
                                        key={notification.id}
                                        id={notification.id}
                                        message={notification.message}
                                        date={notification.date}
                                        userImage={notification.userImage}
                                    />
                                ))}
                        </>
                    ) : (
                        <p className="!text-base-regular text-light-3">
                            No users yet
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">
                    Suggested Users
                    <div className="mt-7 flex w-[350px] flex-col gap-10">
                        {staticUsers.length > 0 ? (
                            <>
                                {staticUsers.slice(2).map((person) => (
                                    <UserCard
                                        key={person.id}
                                        id={person.id}
                                        name={person.name}
                                        email={person.email}
                                        imgUrl={person.image}
                                        isFriend={false}
                                    />
                                ))}
                            </>
                        ) : (
                            <p className="!text-base-regular text-light-3">
                                No users yet
                            </p>
                        )}
                    </div>
                </h3>
            </div>
        </section>
    );
}

export default RightSidebar;
