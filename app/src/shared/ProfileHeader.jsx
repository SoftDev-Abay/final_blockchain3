import React from 'react';
import { Link } from 'react-router-dom';
function ProfileHeader({
    name,
    email = 'abay.aliev.03@gmail.com',
    imgUrl,
    bio,
    type,
    handleButtonSubmit,
    isFriend,
    isSendingFriendRequest,
}) {
    const actionButton =
        type === 'profile' ? ( // If the type is profile, then the button should be Edit
            <Link to="/edit-profile">
                <div
                    className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                    onClick={handleButtonSubmit}
                >
                    <img
                        src="/assets/edit.svg"
                        alt="Edit"
                        width={16}
                        height={16}
                    />
                    <p className="text-light-2 max-sm:hidden">Edit</p>
                </div>
            </Link>
        ) : // If the type is not profile, then the button should be Follow
        isFriend ? ( // If the user is already a friend, then the button should be Unfollow
            <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleButtonSubmit}
            >
                <img
                    src="/assets/user.svg"
                    alt="Friend"
                    width={16}
                    height={16}
                />
                <p className="text-light-2 max-sm:hidden">Folowing</p>
            </div>
        ) : isSendingFriendRequest ? (
            <p className="text-light-2">Loading...</p>
        ) : (
            // If the user is not a friend, then the button should be Follow
            <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleButtonSubmit}
            >
                <img
                    src="/assets/request.svg"
                    alt="Follow"
                    width={16}
                    height={16}
                />
                <p className="text-light-2 max-sm:hidden">Follow</p>
            </div>
        );

    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20">
                        <img
                            src={imgUrl}
                            alt="Profile"
                            className="rounded-full object-cover shadow-2xl"
                            style={{ height: '80px', width: '80px' }} // Using inline styles for width and height
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-left text-heading3-bold text-light-1">
                            {name}
                        </h2>
                        <p className="text-base-medium text-gray-1">{email}</p>
                    </div>
                </div>
                {/*  */}
                {actionButton}
            </div>

            <p className="mt-6 max-w-lg text-base-regular text-light-2">
                {bio}
            </p>

            <div className="mt-12 h-0.5 w-full bg-dark-3" />
        </div>
    );
}

export default ProfileHeader;
