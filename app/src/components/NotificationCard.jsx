import React from 'react';

import { Link } from 'react-router-dom';

function NotificationCard({ publicKey, message, userImage, onSubmit }) {
    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <div className="relative h-12 w-12">
                    <img
                        src={userImage}
                        alt="user_logo"
                        fill
                        className="rounded-full object-cover h-12 w-12"
                    />
                </div>

                <Link to={`/user-profile/${publicKey}`}>
                    <div className="flex-1 text-ellipsis">
                        <h4 className="text-base-semibold text-light-1">
                            {message}
                        </h4>
                        <p className="text-small-medium text-gray-1">
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </Link>
            </div>

            <button
                className="user-card_btn h-10 px-4 py-2"
                onClick={() => {
                    onSubmit(publicKey);
                }}
            >
                Accept
            </button>
        </article>
    );
}

export default NotificationCard;
