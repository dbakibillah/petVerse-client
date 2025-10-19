import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        rating: 0,
        totalSold: 0,
        availableStock: 0,
        category: "",
        petType: [],
        brand: "",
        tags: [],
        image: "",
        shippingInfo: {
            freeShipping: false,
            shippingCost: 0,
            estimatedDelivery: "",
        },
        expirationDate: "",
        weight: "",
        returnPolicy: "",
        warrantyInfo: "",
    });

    const [tagInput, setTagInput] = useState("");
    const [petTypeInput, setPetTypeInput] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("shippingInfo.")) {
            const shippingField = name.split(".")[1];
            setProduct((prev) => ({
                ...prev,
                shippingInfo: {
                    ...prev.shippingInfo,
                    [shippingField]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setProduct((prev) => ({
                ...prev,
                [name]:
                    type === "checkbox"
                        ? checked
                        : type === "number"
                        ? parseFloat(value)
                        : value,
            }));
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !product.tags.includes(tagInput.trim())) {
            setProduct((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setProduct((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleAddPetType = () => {
        if (
            petTypeInput.trim() &&
            !product.petType.includes(petTypeInput.trim())
        ) {
            setProduct((prev) => ({
                ...prev,
                petType: [...prev.petType, petTypeInput.trim()],
            }));
            setPetTypeInput("");
        }
    };

    const handleRemovePetType = (petTypeToRemove) => {
        setProduct((prev) => ({
            ...prev,
            petType: prev.petType.filter(
                (petType) => petType !== petTypeToRemove
            ),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { ...product, totalSold: 0 };

        const response = axiosSecure.post("/add-product", newProduct);
        if (response) {
            toast.success("Product added successfully!");
            setProduct({
                name: "",
                description: "",
                price: 0,
                discount: 0,
                rating: 0,
                totalSold: 0,
                availableStock: 0,
                category: "",
                petType: [],
                brand: "",
                tags: [],
                image: "",
                shippingInfo: {
                    freeShipping: false,
                    shippingCost: 0,
                    estimatedDelivery: "",
                },
                expirationDate: "",
                weight: "",
                returnPolicy: "",
                warrantyInfo: "",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Add New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand *
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter brand name"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                    />
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount (%)
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Available Stock *
                        </label>
                        <input
                            type="number"
                            name="availableStock"
                            value={product.availableStock}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={product.rating}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            max="5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category & Pet Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Grooming">Grooming</option>
                            <option value="Food">Food</option>
                            <option value="Toys">Toys</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pet Type
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={petTypeInput}
                                onChange={(e) =>
                                    setPetTypeInput(e.target.value)
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add pet type (e.g., puppy)"
                            />
                            <button
                                type="button"
                                onClick={handleAddPetType}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.petType.map((petType, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {petType}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemovePetType(petType)
                                        }
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add tag (e.g., natural)"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL *
                    </label>
                    <input
                        type="url"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Shipping Information */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="shippingInfo.freeShipping"
                                checked={product.shippingInfo.freeShipping}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Free Shipping
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipping Cost ($)
                            </label>
                            <input
                                type="number"
                                name="shippingInfo.shippingCost"
                                value={product.shippingInfo.shippingCost}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                disabled={product.shippingInfo.freeShipping}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Delivery
                            </label>
                            <input
                                type="text"
                                name="shippingInfo.estimatedDelivery"
                                value={product.shippingInfo.estimatedDelivery}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 5-7 business days"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration Date
                        </label>
                        <input
                            type="date"
                            name="expirationDate"
                            value={product.expirationDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight/Size
                        </label>
                        <input
                            type="text"
                            name="weight"
                            value={product.weight}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 500ml, 2kg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Return Policy
                        </label>
                        <input
                            type="text"
                            name="returnPolicy"
                            value={product.returnPolicy}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 15-day return policy for unused items"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Warranty Information
                        </label>
                        <input
                            type="text"
                            name="warrantyInfo"
                            value={product.warrantyInfo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 1-year limited warranty"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-bg-secondary focus:ring-offset-2"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
