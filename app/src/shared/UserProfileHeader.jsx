import React from 'react';
import { Link } from 'react-router-dom';
function ProfileHeader({
    name,
    email = 'abay.aliev.03@gmail.com',
    imgUrl,
    bio,
    handleButtonSubmit,
    isFriend,
}) {
    const actionButton = isFriend ? ( // If the user is already a friend, then the button should be Unfollow
        <div
            className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
            onClick={handleButtonSubmit}
        >
            <img src="/assets/user.svg" alt="Friend" width={16} height={16} />
            <p className="text-light-2 max-sm:hidden">Folowing</p>
        </div>
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
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg';
                            }}
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
