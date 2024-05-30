import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/home/Home';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/home/Profile';
import Search from './pages/home/Search';
import UserProfile from './pages/home/UserProfile';
import CreatePost from './pages/home/CreatePost';
import ViewPost from './components/ViewPost';
import Notifications from './pages/home/Notifications';
import Vacancy from './components/Vacancy';
import Vacancies from './pages/home/Vacancies';
import CreateVacancy from './pages/home/CreateVacancy';
import WalletConect from './pages/home/WalletConect';

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Render RootLayout at the top-level route */}
                <Route
                    path="/"
                    exact
                    render={() => <RootLayout children={<Home />} />}
                />
                <Route
                    path="/profile"
                    render={() => <RootLayout children={<Profile />} />}
                />
                <Route
                    path="/user-profile/:publicKey"
                    render={() => <RootLayout children={<UserProfile />} />}
                />
                <Route
                    path="/search"
                    render={() => <RootLayout children={<Search />} />}
                />
                <Route
                    path="/add-post"
                    render={() => <RootLayout children={<CreatePost />} />}
                />
                <Route
                    path="/posts/:id"
                    render={() => <RootLayout children={<ViewPost />} />}
                />
                <Route
                    path="/notifications"
                    render={() => <RootLayout children={<Notifications />} />}
                />
                <Route
                    path="/vacancies"
                    render={() => <RootLayout children={<Vacancies />} />}
                />
                <Route
                    path="/vacancy/:id"
                    render={() => <RootLayout children={<Vacancy />} />}
                />
                <Route
                    path="/add-vacancy"
                    render={() => <RootLayout children={<CreateVacancy />} />}
                />
                <Route
                    path="/wallet"
                    render={() => <RootLayout children={<WalletConect />} />}
                />

                {/* Authentication routes */}
                <Route path="/auth/sign-up" render={() => <SignUp />} />
            </Switch>
        </BrowserRouter>
    );
};
