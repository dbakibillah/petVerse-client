import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    BsCart3,
    BsGrid3X3Gap, // Dashboard icon
    BsBoxArrowRight, // Logout icon
    BsList, // Mobile menu icon
} from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { ThemeContext } from "../../providers/ThemeProvider";
import { useCart } from "../../providers/CartProvider";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const { cart, totalItems } = useCart();
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
                    background: darkMode ? "#1f2937" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: error.message,
                    icon: "error",
                    background: darkMode ? "#1f2937" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
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
                            ? "text-primary font-bold hover:scale-105 transition-transform"
                            : "text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold hover:scale-105 transition-transform"
                            : "text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
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
                                ? "text-primary font-bold hover:scale-105 transition-transform"
                                : "text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
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
                            ? "text-primary font-bold hover:scale-105 transition-transform"
                            : "text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
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
                            ? "text-primary font-bold hover:scale-105 transition-transform"
                            : "text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    }
                >
                    Pet Care
                </NavLink>
            </li>
        </>
    );

    return (
        <section className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="navbar container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <BsList className="h-6 w-6" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 space-y-2"
                        >
                            {links}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center space-x-2">
                        <figure className="w-32">
                            <img
                                className="w-full h-auto transition-transform hover:scale-105"
                                src="https://i.ibb.co/Gfg8bK7B/Untitled-design-3.png"
                                alt="Website logo"
                            />
                        </figure>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end space-x-4">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar group"
                            >
                                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900 transition-all duration-300 group-hover:ring-offset-4">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://via.placeholder.com/150"
                                        }
                                        alt="User Avatar"
                                        className="object-cover"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-64 space-y-1 border border-gray-100 dark:border-gray-700"
                            >
                                <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    src={
                                                        user.photoURL ||
                                                        "https://via.placeholder.com/150"
                                                    }
                                                    alt="User Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                {user.displayName || "User"}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {user.email || "Welcome back!"}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                        <BsGrid3X3Gap className="w-5 h-5 mr-2" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleToggleDarkMode}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors w-full"
                                    >
                                        {darkMode ? (
                                            <>
                                                <MdOutlineLightMode className="w-5 h-5 mr-2 text-yellow-400" />
                                                Light Mode
                                            </>
                                        ) : (
                                            <>
                                                <MdOutlineDarkMode className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300" />
                                                Dark Mode
                                            </>
                                        )}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                        <BsBoxArrowRight className="w-5 h-5 mr-2" />
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <Link
                                to="/login"
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:from-secondary hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                    <div className="relative">
                        <Link to="/cart">
                            <button className="btn btn-ghost btn-circle group relative">
                                <BsCart3 className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                                <span className="absolute -top-1 -right-1 badge badge-sm bg-primary text-white px-2 py-1 rounded-full shadow-md animate-pulse">
                                    {totalItems || 0}
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
