import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";

import VendorTable from "../components/VendorTable";
import { fetchVendorsThunk, deleteVendorThunk } from "../redux/vendorThunk";
import hasPermission from "../../../../utils/hasPermission";

const VendorListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { vendors, loading } = useSelector((state) => state.vendors);
    const { permissions } = useSelector((state) => state.auth);

    // FETCH VENDORS
    useEffect(() => {
        dispatch(fetchVendorsThunk());
    }, [dispatch]);

    // DELETE VENDOR
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this vendor?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteVendorThunk(id)).unwrap();
            toast.success("Vendor deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || error || "Failed to delete vendor");
        }
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Vendors</h1>
                    <p className="text-gray-500">Manage all vendors</p>
                </div>

                {hasPermission(permissions, "create_vendor") && (
                    <Link
                        to="/edu/vendors/create"
                        className="inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                        <FiPlus />
                        <span>Add Vendor</span>
                    </Link>
                )}
            </div>

            {/* TABLE */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                {loading ? (
                    <div className="py-10 text-center text-gray-500">
                        Loading vendors...
                    </div>
                ) : (
                    <VendorTable data={vendors} navigate={navigate} handleDelete={handleDelete} />
                )}
            </div>
        </div>
    );


    // return (
    //     <div className="space-y-6">

    //         {/* HEADER */}
    //         <div
    //             className="
    //                 flex
    //                 flex-col
    //                 sm:flex-row
    //                 sm:items-center
    //                 sm:justify-between
    //                 gap-4
    //             "
    //         >

    //             <div>

    //                 <h1
    //                     className="
    //                         text-2xl
    //                         font-bold
    //                     "
    //                 >
    //                     Vendors
    //                 </h1>

    //                 <p className="text-gray-500">
    //                     Manage all vendors
    //                 </p>

    //             </div>

    //             {
    //                 hasPermission(
    //                     permissions,
    //                     "create_vendor"
    //                 ) && (

    //                     <Link
    //                         to={`vendors/create`}
    //                         className="
    //                             inline-flex
    //                             items-center
    //                             justify-center
    //                             gap-2
    //                             bg-blue-950
    //                             hover:bg-blue-900
    //                             text-white
    //                             font-medium
    //                             text-sm
    //                             px-4
    //                             py-2.5
    //                             rounded-xl
    //                             shadow-sm
    //                             hover:shadow
    //                             transition-all
    //                         "
    //                     >

    //                         <FiPlus />

    //                         <span>
    //                             Add Vendor
    //                         </span>

    //                     </Link>
    //                 )
    //             }

    //         </div>

    //         {/* TABLE */}
    //         <div
    //             className="
    //                 bg-white
    //                 border
    //                 rounded-2xl
    //                 p-4
    //             "
    //         >

    //             {
    //                 loading ? (

    //                     <div
    //                         className="
    //                             py-10
    //                             text-center
    //                             text-gray-500
    //                         "
    //                     >
    //                         Loading vendors...
    //                     </div>

    //                 ) : (

    //                     <VendorTable
    //                         data={vendors}
    //                         handleDelete={handleDelete}
    //                     />
    //                 )
    //             }

    //         </div>

    //     </div>
    // );
};

export default VendorListPage;