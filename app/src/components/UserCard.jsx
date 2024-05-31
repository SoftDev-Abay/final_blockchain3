function UserCard({
    accountId,
    name,
    email,
    imgUrl,
    isFriend,
    onView,
    buttonAction,
}) {
    return (
        <article className="user-card ">
            <div className="user-card_avatar">
                <div className="relative h-12 w-12">
                    <img
                        src={imgUrl}
                        alt="user_logo"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg';
                        }}
                        fill
                        className="rounded-full object-cover h-12 w-12"
                    />
                </div>

                <div className="flex-1 text-ellipsis">
                    <h4
                        className="text-base-semibold text-light-1 cursor-pointer"
                        onClick={onView}
                    >
                        {name}
                    </h4>
                    <p className="text-small-medium text-gray-1">
                        @mail@gmail.com
                    </p>
                </div>
            </div>

            {buttonAction && (
                <button
                    className="user-card_btn h-10 px-4 py-2"
                    onClick={onView}
                >
                    View
                </button>
            )}
        </article>
    );
}

export default UserCard;
