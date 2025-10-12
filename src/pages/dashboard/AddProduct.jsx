import { useState } from "react";
import {
    FaCalendarAlt,
    FaDollarSign,
    FaFileAlt,
    FaImage,
    FaPercent,
    FaPlus,
    FaShieldAlt,
    FaStar,
    FaTag,
    FaTimes,
    FaTruck,
    FaUndo,
    FaUser,
    FaWeightHanging,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newProduct = { ...product, totalSold: 0 };
            await axiosSecure.post("/add-product", newProduct);
            toast.success("Product added successfully!");

            // Reset form
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
            setTagInput("");
            setPetTypeInput("");
        } catch (error) {
            toast.error("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, children, icon: Icon }) => (
        <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {label}
            </label>
            {children}
        </div>
    );

    const Section = ({ title, icon: Icon, children }) => (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                {Icon && <Icon className="w-5 h-5 text-blue-600 mr-3" />}
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );

    const TagChip = ({ text, onRemove, color = "blue" }) => {
        const colorClasses = {
            blue: "bg-blue-50 text-blue-700 border-blue-200",
            green: "bg-green-50 text-green-700 border-green-200",
            purple: "bg-purple-50 text-purple-700 border-purple-200",
        };

        return (
            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[color]}`}
            >
                {text}
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-2 hover:opacity-70 transition-opacity"
                >
                    <FaTimes className="w-3 h-3" />
                </button>
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Add New Product
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to add a new product to your
                        inventory
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Section */}
                    <Section title="Basic Information" icon={FaFileAlt}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Product Name *">
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter product name"
                                />
                            </InputField>

                            <InputField label="Brand *">
                                <input
                                    type="text"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter brand name"
                                />
                            </InputField>
                        </div>

                        <InputField label="Description *">
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                placeholder="Enter detailed product description..."
                            />
                        </InputField>
                    </Section>

                    {/* Pricing & Inventory Section */}
                    <Section title="Pricing & Inventory" icon={FaTag}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <InputField label="Price ($) *">
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        required
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </InputField>

                            <InputField label="Discount (%)">
                                <div className="relative">
                                    <FaPercent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                                    <input
                                        type="number"
                                        name="discount"
                                        value={product.discount}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </InputField>

                            <InputField label="Stock *">
                                <input
                                    type="number"
                                    name="availableStock"
                                    value={product.availableStock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </InputField>

                            <InputField label="Rating">
                                <div className="relative">
                                    <FaStar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                                    <input
                                        type="number"
                                        name="rating"
                                        value={product.rating}
                                        onChange={handleChange}
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </InputField>
                        </div>
                    </Section>

                    {/* Category & Classification Section */}
                    <Section title="Category & Classification" icon={FaUser}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Category *">
                                <select
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Grooming">Grooming</option>
                                    <option value="Food">Food</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Healthcare">
                                        Healthcare
                                    </option>
                                    <option value="Accessories">
                                        Accessories
                                    </option>
                                </select>
                            </InputField>

                            <InputField label="Pet Type">
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={petTypeInput}
                                            onChange={(e) =>
                                                setPetTypeInput(e.target.value)
                                            }
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Add pet type (e.g., puppy)"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddPetType}
                                            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <FaPlus className="w-4 h-4" />
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.petType.map(
                                            (petType, index) => (
                                                <TagChip
                                                    key={index}
                                                    text={petType}
                                                    onRemove={() =>
                                                        handleRemovePetType(
                                                            petType
                                                        )
                                                    }
                                                    color="purple"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </InputField>
                        </div>

                        <InputField label="Tags">
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Add tag (e.g., natural)"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
                                    >
                                        <FaPlus className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <TagChip
                                            key={index}
                                            text={tag}
                                            onRemove={() =>
                                                handleRemoveTag(tag)
                                            }
                                            color="green"
                                        />
                                    ))}
                                </div>
                            </div>
                        </InputField>
                    </Section>

                    {/* Media Section */}
                    <Section title="Media" icon={FaImage}>
                        <InputField label="Image URL *">
                            <input
                                type="url"
                                name="image"
                                value={product.image}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="https://example.com/image.jpg"
                            />
                        </InputField>
                    </Section>

                    {/* Shipping Information Section */}
                    <Section title="Shipping Information" icon={FaTruck}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="shippingInfo.freeShipping"
                                    checked={product.shippingInfo.freeShipping}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Free Shipping
                                </label>
                            </div>

                            <InputField label="Shipping Cost ($)">
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                                    <input
                                        type="number"
                                        name="shippingInfo.shippingCost"
                                        value={
                                            product.shippingInfo.shippingCost
                                        }
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        disabled={
                                            product.shippingInfo.freeShipping
                                        }
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                                    />
                                </div>
                            </InputField>

                            <InputField label="Estimated Delivery">
                                <input
                                    type="text"
                                    name="shippingInfo.estimatedDelivery"
                                    value={
                                        product.shippingInfo.estimatedDelivery
                                    }
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., 5-7 business days"
                                />
                            </InputField>
                        </div>
                    </Section>

                    {/* Additional Information Section */}
                    <Section title="Additional Information" icon={FaShieldAlt}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Expiration Date"
                                icon={FaCalendarAlt}
                            >
                                <input
                                    type="date"
                                    name="expirationDate"
                                    value={product.expirationDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </InputField>

                            <InputField
                                label="Weight/Size"
                                icon={FaWeightHanging}
                            >
                                <input
                                    type="text"
                                    name="weight"
                                    value={product.weight}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., 500ml, 2kg"
                                />
                            </InputField>

                            <InputField label="Return Policy" icon={FaUndo}>
                                <input
                                    type="text"
                                    name="returnPolicy"
                                    value={product.returnPolicy}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., 15-day return policy for unused items"
                                />
                            </InputField>

                            <InputField
                                label="Warranty Information"
                                icon={FaShieldAlt}
                            >
                                <input
                                    type="text"
                                    name="warrantyInfo"
                                    value={product.warrantyInfo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., 1-year limited warranty"
                                />
                            </InputField>
                        </div>
                    </Section>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Adding Product...
                                </>
                            ) : (
                                <>
                                    <FaPlus className="w-5 h-5" />
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
