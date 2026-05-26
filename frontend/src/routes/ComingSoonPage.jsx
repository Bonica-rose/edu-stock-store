import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const ComingSoonPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-4">
                Coming soon....
            </h2>
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Go Back
            </button>
        </div>
    );
};

export default ComingSoonPage;
