import { useSelector } from "react-redux";
import { LuGitBranch } from "react-icons/lu";
import branches from "../../../mock/branches.json";

const BranchSwitcher = () => {
    const { user } = useSelector((state) => state.auth);

    // Later must take redux state branches
    const loggedUserBranch =
        branches.find(
            (branch) => branch.id === user.branch_id
        ); 
    
    return (
        <div className="group relative hidden sm:block">
            {/* Icon */}
            <LuGitBranch
                className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-slate-700
                    group-hover:text-white
                    transition-colors duration-200
                "
                size={18}
            />
            <span
                className="
                    appearance-none rounded-xl
                    border border-slate-200
                    bg-white py-2 pl-10 pr-10
                    text-sm font-medium text-slate-700
                    shadow-sm outline-none
                    transition-all duration-200           
                    group-hover:bg-rose-500
                    group-hover:border-rose-500
                    group-hover:text-white
                "
            >
                {loggedUserBranch?.name}
            </span>
        </div>
    )
}

export default BranchSwitcher