const Navbar = () => {
    return (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
            <h1 className="text-lg font-semibold">
                Dashboard
            </h1>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                    Super Admin
                </span>

                <div className="w-10 h-10 rounded-full bg-gray-300" />
            </div>
        </header>
    );
};

export default Navbar;