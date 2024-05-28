import { Route, Routes } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/home/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Profile from './pages/home/Profile';
import RequireAuth from './features/auth/RequireAuth';
import Search from './pages/home/Search';
import PersistLogin from './features/auth/PersistLogin';
import UserProfile from './pages/home/UserProfile';
import CreatePost from './pages/home/CreatePost';
import ViewPost from './components/ViewPost';
import Notifications from './pages/home/Notifications';
import Vacancy from './components/Vacancy';
import Vacancies from './pages/home/Vacancies';
import CreateVacancy from './pages/home/CreateVacancy';


function App() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                {/* protected routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route
                            path="user-profile/:id"
                            element={<UserProfile />}
                        />
                        <Route path="search" element={<Search />} />
                        <Route path="add-post" element={<CreatePost />} />
                        <Route path="posts/:id" element={<ViewPost />} />

                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />
                        <Route path="vacancies" element={<Vacancies />} />
                        <Route path="vacancy/:id" element={<Vacancy />} />
                        <Route path="add-vacancy" element={<CreateVacancy />} />
                    </Route>
                </Route>
            </Route>
            <Route path="/auth">
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
            </Route>
        </Routes>
    );
}

export default App;
