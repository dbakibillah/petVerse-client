import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProviders";
import { ThemeContext } from "../../providers/ThemeProvider";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Logged out successfully!",
                    icon: "success",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: error.message,
                    icon: "error",
                });
            });
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold"
                            : "text-black dark:text-gray-200"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/available-camps"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold"
                            : "text-black dark:text-gray-200"
                    }
                >
                    Shop
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to="/feedbacks"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-bold"
                                : "text-black dark:text-gray-200"
                        }
                    >
                        Forum
                    </NavLink>
                </li>
            )}
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold"
                            : "text-black dark:text-gray-200"
                    }
                >
                    Services
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/pet-care"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold"
                            : "text-black dark:text-gray-200"
                    }
                >
                    Pet Care
                </NavLink>
            </li>
        </>
    );

    return (
        <section className="bg-base-100 dark:bg-gray-900 sticky top-0 z-10">
            <div className="navbar container mx-auto bg-base-100 dark:bg-gray-900 dark:text-gray-200 lg:px-24">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>

                    <Link to="/">
                        <figure className="w-28 flex items-center">
                            <img
                                className="w-full object-cover"
                                src="https://i.ibb.co/Gfg8bK7B/Untitled-design-3.png"
                                alt=""
                            />
                        </figure>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
                </div>

                <div className="navbar-end">
                    <div className="flex gap-4 items-center">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-12 rounded-full">
                                        <img
                                            src={
                                                user.photoURL ||
                                                "https://via.placeholder.com/150"
                                            }
                                            alt="User Avatar"
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box mt-3 w-52 p-2 shadow z-10"
                                >
                                    <li>
                                        <span className="font-bold">
                                            Hello, {user.displayName || "User"}!
                                        </span>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="btn btn-ghost text-black dark:text-gray-200 dark:hover:bg-gray-700"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-ghost text-black dark:text-gray-200 dark:hover:bg-gray-700"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <span className="flex gap-2">
                                <Link
                                    to="/login"
                                    className="px-6 py-2 text-black rounded-full bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:bg-gradient-to-l border-none"
                                >
                                    Login
                                </Link>
                            </span>
                        )}
                        <div>
                            <button
                                onClick={handleToggleDarkMode}
                                className="btn btn-ghost btn-circle btn-sm"
                            >
                                {darkMode ? (
                                    <MdOutlineLightMode className="text-xl text-yellow-400" />
                                ) : (
                                    <MdOutlineDarkMode className="text-xl text-gray-800" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
