const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">
                    403
                </h1>

                <p className="text-gray-600">
                    Access Denied
                </p>
            </div>
        </div>
    );
};

export default Unauthorized;