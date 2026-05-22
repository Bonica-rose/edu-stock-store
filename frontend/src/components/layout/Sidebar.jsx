const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white h-screen p-4">
            <h2 className="text-xl font-bold mb-6">
                Inventory System
            </h2>

            <nav className="space-y-2">
                <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
                    Dashboard
                </div>

                <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
                    Users
                </div>

                <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">
                    Branches
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;