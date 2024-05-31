import { useState } from 'react';
import { useBlog } from 'src/context/Blog';
import { PublicKey, SystemProgram } from '@solana/web3.js';
const AddUser = () => {
    const { user, getPersonByPublicKey, sendFriendRequest } = useBlog();
    const [error, setError] = useState('');
    const [key, setKey] = useState('');

    const checkPublicKeyInUserAccounts = (key) => {
        const user = getPersonByPublicKey(key);
        if (user) {
            return true;
        }
        return false;
    };

    const addUser = () => {
        if (checkPublicKeyInUserAccounts(key)) {
            const transformedKey = new PublicKey(key);
            sendFriendRequest(transformedKey);
            setError('');
        } else {
            setError('User not found');
        }
    };

    return (
        <section>
            <h1 className="text-heading4-medium mb-10">Add user</h1>
            <div>
                <div className="searchbar">
                    <img
                        src="/assets/search-gray.svg"
                        alt="search"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    <input
                        id="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder={'Add user by public key'}
                        className="no-focus searchbar_input text-white flex-1"
                    />
                </div>

                {error && <p className="error">{error}</p>}
                <button
                    className="user-card_btn h-10 px-4 py-2 mt-6 w-full"
                    onClick={addUser}
                >
                    Add user
                </button>
            </div>
        </section>
    );
};

export default AddUser;
