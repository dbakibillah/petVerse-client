import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';

const AllProductCom = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosPublic.get('/products');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="text-center py-20 text-lg font-semibold text-gray-500">
                Loading products...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-600 font-semibold">
                Error loading products: {error.message}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500 font-medium">
                No products available at the moment.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default AllProductCom;
