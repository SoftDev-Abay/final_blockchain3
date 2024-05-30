function UserCard({ accountId, name, email, imgUrl, isFriend, onView }) {
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <img
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover h-12 w-12"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{email}</p>
        </div>
      </div>

      <button className="user-card_btn h-10 px-4 py-2" onClick={onView}>
        View
      </button>
    </article>
  );
}

export default UserCard;
