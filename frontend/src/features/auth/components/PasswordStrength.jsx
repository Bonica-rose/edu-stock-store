import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PolicyItem = ({ valid, text, outui }) => {

    let iconDefaultColor = outui ? "text-red-400" : "text-red-600";
    let iconGoodColor = outui ? "text-green-400" : "text-green-600";


    let textDefaultColor = outui ? "text-slate-400" : "text-slate-500";
    let textGoodColor = outui ? "text-green-300" : "text-green-600";

    return (    
        <div className="flex items-center gap-2 text-sm">
            {valid ? (
                <FaCheckCircle className={iconGoodColor} />
            ) : (
                <FaTimesCircle className={iconDefaultColor} />
            )}

            <span className={valid ? textGoodColor : textDefaultColor}>
                {text}
            </span>
        </div>
)};

const PasswordStrength = ({ password = "" , outside }) => {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[@$!%*?&]/.test(password),
    };

    let textWeakColor = outside ? 'text-red-400' : 'text-red-600';
    let textMediumColor = outside ? 'text-yellow-400' : 'text-yellow-500';
    let textStrongColor = outside ? 'text-green-400' : 'text-green-700';

    let bgWeakColor = outside ? 'bg-red-400' : 'bg-red-600';
    let bgMediumColor = outside ? 'bg-yellow-300' : 'bg-yellow-400';
    let bgStrongColor = outside ? 'bg-green-400' : 'bg-green-600';

    const passed = Object.values(checks).filter(Boolean).length;

    const getStrength = () => {
        if (passed <= 2) return { text: "Weak", color: bgWeakColor };
        if (passed === 3 || passed === 4)
            return { text: "Medium", color: bgMediumColor };
        return { text: "Strong", color: bgStrongColor };
    };    

    const strength = getStrength();

    if (!password) return null;

    return (
        <div className="mt-4 space-y-3">

            {/* Strength Header */}
            <div className="flex items-center justify-between">
                <span className={`text-sm ${ outside ? 'text-slate-300': 'text-blue-950' } `}>
                    Password Strength
                </span>
                <span
                    className={`text-sm font-semibold ${
                        strength.text === "Weak"
                            ? textWeakColor
                            : strength.text === "Medium"
                            ? textMediumColor
                            : textStrongColor
                    }`}
                >
                    {strength.text}
                </span>
            </div>

            {/* Progress Bar */}
            <div className={`w-full h-2 ${ outside ? 'bg-slate-700': 'border border-gray-200' }  rounded-full overflow-hidden`}>
                <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${(passed / 5) * 100}%` }}
                />
            </div>

            {/* Rules */}
            <div className={`${ outside ? 'bg-slate-800 border border-slate-700': 'bg-slate-50' } p-4  rounded-lg  space-y-2`}>
                <PolicyItem valid={checks.length} text="Minimum 8 characters" outui={outside} />
                <PolicyItem valid={checks.uppercase} text="At least one uppercase letter" outui={outside} />
                <PolicyItem valid={checks.lowercase} text="At least one lowercase letter" outui={outside} />
                <PolicyItem valid={checks.number} text="At least one number" outui={outside} />
                <PolicyItem valid={checks.special} text="At least one special character (@$!%*?&)" outui={outside} />
            </div>

        </div>
    );
};

export default PasswordStrength;