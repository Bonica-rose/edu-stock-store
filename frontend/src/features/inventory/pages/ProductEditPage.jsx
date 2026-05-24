import {
    useParams,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import products from "../../../mock/products.json";

import ProductForm from "../components/ProductForm";

const ProductEditPage = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const product =
        products.find(
            (item) =>
                item.id ===
                Number(id)
        );

    const handleSubmit = (
        values
    ) => {

        console.log(values);

        toast.success(
            "Product updated successfully!"
        );

        navigate(
            "/edu/products"
        );
    };

    if (!product) {
        return (
            <p>
                Product not found
            </p>
        );
    }

    return (
        <div
            className="
                max-w-5xl
                mx-auto
                bg-white
                border rounded-lg
                p-6
            "
        >

            <div className="mb-6">
                <h1
                    className="
                        text-2xl
                        font-bold
                    "
                >
                    Edit Product
                </h1>

                <p
                    className="
                        text-sm
                        text-slate-500
                    "
                >
                    Update product
                    details.
                </p>
            </div>

            <ProductForm
                defaultValues={
                    product
                }
                onSubmit={
                    handleSubmit
                }
            />

        </div>
    );
};

export default ProductEditPage;