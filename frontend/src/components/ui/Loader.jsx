const Loader = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-950 border-t-transparent"></div>

            <p className="text-sm text-blue-950">
                Loading...
            </p>
        </div>
    );
};

export default Loader;