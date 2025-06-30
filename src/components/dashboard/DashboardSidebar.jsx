import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiUser,
    FiSettings,
    FiPieChart,
    FiFileText,
    FiLogOut,
    FiChevronRight,
    FiAward,
    FiHeart,
    FiCalendar,
    FiShoppingCart,
    FiMessageCircle,
} from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DashboardSidebar = () => {
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleuser?email=${user.email}`);
            return res.data.data;
        },
        enabled: !!user?.email,
    });

    const isActive = (path) => pathname.startsWith(path);

    const adminLinks = [
        { path: "/dashboard/profile", name: "Profile", icon: <FiUser className="text-lg" /> },
        { path: "/dashboard/admin-analytics", name: "Analytics", icon: <FiPieChart className="text-lg" /> },
        { path: "/dashboard/healthappointments", name: "Health Appointments", icon: <FiFileText className="text-lg" /> },
        { path: "/dashboard/grooming", name: "Grooming", icon: <FiSettings className="text-lg" /> },
    ];

    const userLinks = [
        { path: "/dashboard/profile", name: "Profile", icon: <FiUser className="text-lg" /> },
        { path: "/dashboard/mygroomingappointments", name: "My Appointments", icon: <FiCalendar className="text-lg" /> },
        { path: "/dashboard/my-orders", name: "My Orders", icon: <FiShoppingCart className="text-lg" /> },
    ];

    // Show nothing while loading user role
    if (isLoading) return null;

    const linksToRender = currentUser?.role === "admin" ? adminLinks : userLinks;

    return (
        <section className="w-80 h-screen sticky top-0 flex flex-col bg-[#FFFBEE] border-r border-gray-200">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF552A]">
                        <FiAward className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF552A] to-[#FF7350] bg-clip-text text-transparent">
                        {currentUser?.role === "admin" ? "AdminPanel" : "UserPanel"}
                    </h3>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-2">
                    {linksToRender.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive(link.path)
                                        ? "text-white bg-[#FF552A] shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span
                                        className={
                                            isActive(link.path)
                                                ? "text-white"
                                                : "text-[#FF552A]"
                                        }
                                    >
                                        {link.icon}
                                    </span>
                                    <span className="font-medium">{link.name}</span>
                                </div>
                                <FiChevronRight
                                    className={`text-sm transition-transform ${
                                        isActive(link.path)
                                            ? "rotate-90 text-white"
                                            : "text-gray-400"
                                    }`}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer/User Section */}
            <div className="p-5 border-t border-gray-200 space-y-3">
                {/* Home Link */}
                <Link
                    to="/"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 
                      bg-gradient-to-r from-[#FFFBEE] to-white
                      hover:from-[#FF552A]/10 hover:to-[#FF7350]/10
                      group hover:shadow-sm hover:-translate-y-0.5"
                >
                    <div className="p-2 mr-3 rounded-lg bg-[#FF552A]/10 group-hover:bg-[#FF552A]/20 transition-colors">
                        <FiHome className="text-lg text-[#FF552A] group-hover:text-[#FF7350] transition-colors" />
                    </div>
                    <span className="text-[#FF552A] group-hover:text-[#FF7350] transition-colors">
                        Home
                    </span>
                    <FiChevronRight className="ml-auto text-[#FF552A]/50 group-hover:text-[#FF7350] transition-colors" />
                </Link>

                {/* User Profile */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFFBEE] to-white hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#FF552A] to-[#FF7350] shadow-md">
                                    <span className="text-xs font-bold">
                                        {currentUser?.role === "admin" ? "AD" : "US"}
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {user?.displayName || "User"}
                                </p>
                                <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#FF552A] to-[#FF7350]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                            className="p-2 rounded-xl hover:bg-[#FF552A]/10 text-[#FF552A] hover:text-[#FF7350] transition-colors"
                            aria-label="Logout"
                        >
                            <FiLogOut className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSidebar;
