import { useQuery } from "@tanstack/react-query";
import ShopBanner from "../../components/shop/ShopBanner";
import Categories from "../../components/shop/Categories";
import Bestsellers from "../../components/shop/Bestsellers";
import { Helmet } from "react-helmet";

const Shop = () => {
    // Fetch products
    const {
        data: products = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        querykey: ["products"],
        queryFn: async () => {
            const res = await fetch("./public/products.json");
            return res.json();
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
        </section>
    );
};

export default Shop;
