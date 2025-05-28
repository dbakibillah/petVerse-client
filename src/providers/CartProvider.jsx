import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProviders";
import useAxiosPublic from "../hooks/useAxiosPublic";

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
                toast.error(`Failed to fetch cart: ${error.message}`);
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
            toast.info("Please login to add items to cart");
            return false;
        }

        try {
            setIsLoading(true);

            const newItem = {
                productId: product._id,
                productName: product.name,
                productImage: product.image,
                quantity: 1,
                price: parseFloat(
                    (
                        product.price -
                        (product.price * product.discount) / 100
                    ).toFixed(2)
                ),
                addedAt: new Date().toLocaleString(),
            };

            const cartData = {
                email: user.email,
                cartItems: [newItem],
                totalPrice: newItem.price,
                totalItems: 1,
                updatedAt: new Date().toLocaleString(),
            };

            const response = await axiosPublic.post("/carts", {
                cartData,
            });

            setCart(response.data);
            toast.success("Item added to cart");
            return true;
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to add to cart"
            );
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
            quantity: 1,
            price: parseFloat(
                (
                    product.price -
                    (product.price * product.discount) / 100
                ).toFixed(2)
            ),
            addedAt: new Date().toISOString(), // Prefer ISO format for backend
        };

        try {
            const response = await axiosPublic.patch("/carts", {
                email: user?.email, // ❗ Fix here: You need to explicitly set `email` key
                newItem, // ❗ Fix here: Send newItem separately (not destructured)
            });

            setCart(response.data);
            toast.success("Item added to cart");
            return true;
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error("Failed to add item to cart");
            return false;
        }
    };

    const updateQuantity = async (product) => {
        await axiosPublic.patch("/carts/increase", {
            email: user.email,
            productId: product._id,
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
        fetchCart();
    };

    const clearCart = async () => {
        await axiosPublic.delete("/carts/clear", {
            data: { email: user.email },
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
