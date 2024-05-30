import { React, useState, useEffect } from 'react';
import SignUpForm from './SignUpForm';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useBlog } from 'src/context/Blog';
import { useHistory } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
const SignUp = () => {
    //   const navigate = useNavigate();
    const [connecting, setConnecting] = useState(false);

    const history = useHistory();

    const { user, initialized, initUser, setShowModal } = useBlog();
    const { connected, select } = useWallet();

    const userData = {
        id: '',
        name: '',
        bio: '',
        image: '',
    };

    const onConnect = () => {
        setConnecting(true);
        select(PhantomWalletName);
    };

    useEffect(() => {
        if (user) {
            setConnecting(false);
        }
    }, [user]);

    const handleSubmit = (data) => {
        initUser(data.name, data.avatar, data.bio);
    };

    let content;

    if (!connected) {
        content = (
            <div>
                You are not connected to the network. Please connect to the
                network to continue.
                <button
                    onClick={onConnect}
                    className="
                    bg-primary-500  px-4 py-2 rounded-md text-white mt-4
                    "
                >
                    Connect Wallet
                </button>
            </div>
        );
    } else if (connected && !initialized) {
        content = (
            <SignUpForm
                user={userData}
                btnTitle="Sign up"
                submitData={handleSubmit}
            />
        );
    } else if (connected && initialized) {
        content = (
            <div>
                <p>Connected to the network</p>
                <button
                    onClick={() => {
                        history.push('/');
                    }}
                    className="
                    bg-primary-500  px-4 py-2 rounded-md text-white mt-4
                    "
                >
                    Go to main page
                </button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }

    return (
        <div className="bg-dark-1 min-h-[100vh]">
            <main className=" mx-auto flex max-w-3xl flex-col justify-start  px-10 py-20">
                <h1 className="head-text">Registration</h1>
                <p className="mt-3 text-base-regular text-light-2">
                    Complete your profile now to use Network
                </p>
                <section className="mt-9 bg-dark-2 p-10 ">
                    {content}
                    {/* <p className="text-sm text-light-2 mt-5 text-right">
                        Already have an account?{' '}
                        <Link to="/auth/sign-in" className="text-primary-500">
                            Sign In
                        </Link>
                    </p> */}
                </section>
            </main>
        </div>
    );
};

export default SignUp;
