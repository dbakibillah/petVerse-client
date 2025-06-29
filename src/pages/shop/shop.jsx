import { useQuery } from "@tanstack/react-query";
import ShopBanner from "../../components/shop/ShopBanner";
import Categories from "../../components/shop/Categories";
import Bestsellers from "../../components/shop/Bestsellers";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import AllProductCom from "../../components/shop/AllProductCom";

const Shop = () => {
    // Scroll to top only on initial load
    const [hasInitialScroll, setHasInitialScroll] = useState(false);
    useEffect(() => {
        if (!hasInitialScroll) {
            window.scrollTo(0, 0);
            setHasInitialScroll(true);
        }
    }, [hasInitialScroll]);
    const axiosPublic = useAxiosPublic();
    // Fetch products
    const {
        data: products = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        querykey: ["/products"],
        queryFn: async () => {
            const res = await axiosPublic.get("products");
            return res.data;
        },
    });

    // Loading & Error handling
    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-gray-700 dark:text-gray-200">
                    Loading...
                </p>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-red-500">Error: {error.message}</p>
            </section>
        );
    }
    return (
        <section className="container mx-auto p-2 lg:px-24 min-h-screen">
            <Helmet title="petVerse | Shop" />
            <ShopBanner />
            <Bestsellers products={products} />
            <Categories products={products} />
            <AllProductCom />
        </section>
    );
};

export default Shop;
