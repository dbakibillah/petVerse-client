import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "./AuthProviders";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [cart, setCart] = useState({
        cartItems: [],
        totalPrice: 0,
        totalItems: 0,
        createdAt: null,
        updatedAt: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    // Fetch cart data when user changes
    const fetchCart = useCallback(async () => {
        if (user?.email) {
            try {
                setIsLoading(true);
                const response = await axiosPublic.get(
                    `/carts?email=${user.email}`
                );
                setCart(
                    response.data || {
                        cartItems: [],
                        totalPrice: 0,
                        totalItems: 0,
                        updatedAt: new Date().toLocaleString(),
                    }
                );
            } catch (error) {
                toast(error.response?.data?.message || "Failed to fetch cart", {
                    type: "error",
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetCart();
            } finally {
                setIsLoading(false);
            }
        } else {
            resetCart();
        }
    }, [user?.email, axiosPublic]);

    // Initial fetch when the user changes
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const resetCart = () => {
        setCart({
            cartItems: [],
            totalPrice: 0,
            totalItems: 0,
            updatedAt: new Date().toLocaleString(),
        });
        setIsLoading(false);
    };

    const addToCart = async (product) => {
        if (!user?.email) {
            toast("Please login to add to cart", {
                type: "info",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }

        try {
            setIsLoading(true);

            const newItem = {
                productId: product._id,
                productName: product.name,
                productImage: product.image,
                unitPrice: product.price,
                discount: product.discount,
                quantity: 1,
                price: parseFloat(
                    (
                        product.price -
                        (product.price * product.discount) / 100
                    ).toFixed(2)
                ),
                shippingInfo: product.shippingInfo,
                addedAt: new Date().toLocaleString(),
            };

            const cartData = {
                email: user.email,
                cartItems: [newItem],
                totalPrice: parseFloat(
                    (
                        newItem.price +
                        (newItem.shippingInfo?.shippingCost || 0)
                    ).toFixed(2)
                ),
                totalItems: 1,
                updatedAt: new Date().toLocaleString(),
            };

            const response = await axiosPublic.post("/carts", {
                cartData,
            });

            setCart(response.data);
            toast("Item added to cart", {
                type: "success",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return true;
        } catch (error) {
            console.error(error);
            toast("Failed to add item to cart", {
                type: "error",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const updateCart = async (product) => {
        const newItem = {
            productId: product._id,
            productName: product.name,
            productImage: product.image,
            unitPrice: product.price,
            discount: product.discount,
            quantity: 1,
            price: parseFloat(
                (
                    product.price -
                    (product.price * product.discount) / 100
                ).toFixed(2)
            ),
            shippingInfo: product.shippingInfo,
            addedAt: new Date().toISOString(), // Prefer ISO format for backend
        };

        try {
            const response = await axiosPublic.patch("/carts", {
                email: user?.email, // ❗ Fix here: You need to explicitly set `email` key
                newItem, // ❗ Fix here: Send newItem separately (not destructured)
            });

            setCart(response.data);
            toast("Item updated in cart", {
                type: "success",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return true;
        } catch (error) {
            console.error("Error updating cart:", error);
            toast("Failed to update item in cart", {
                type: "error",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
    };

    const updateQuantity = async (product) => {
        await axiosPublic.patch("/carts/increase", {
            email: user.email,
            productId: product.productId || product._id,
        });
        toast("Item Added", {
            type: "success",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        fetchCart();
    };

    const decreaseQuantity = async (product) => {
        await axiosPublic.patch("/carts/decrease", {
            email: user.email,
            productId: product.productId || product._id,
        });
        toast("Item Decreased", {
            type: "success",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        fetchCart();
    };

    const removeFromCart = async (product) => {
        await axiosPublic.delete("/carts/item", {
            data: {
                email: user.email,
                productId: product._id || product.productId,
            },
        });
        toast("Item removed from cart", {
            type: "success",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        fetchCart();
    };

    const clearCart = async () => {
        await axiosPublic.delete("/carts/clear", {
            data: { email: user.email },
        });
        toast("Cart cleared", {
            type: "success",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        fetchCart();
    };

    const getItem = (productId, variant = "") => {
        return cart.cartItems.find(
            (item) => item.productId === productId && item.variant === variant
        );
    };

    const value = {
        cart,
        isLoading,
        addToCart,
        updateCart,
        removeFromCart,
        updateQuantity,
        decreaseQuantity,
        clearCart,
        getItem,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        refetchCart: fetchCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
