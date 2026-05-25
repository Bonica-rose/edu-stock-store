const generateNameFromAccount = (username = "", email = "") => {
    // 1. If username exists, prioritize it and clean up delimiters
    let baseText = username?.trim();

    // 2. Fallback to Email prefix if username is missing
    if (!baseText && email) {
        baseText = email.split("@")[0]; // Grab everything before the @ symbol
    }

    if (!baseText) return "New User";

    // 3. Clean text: Replace periods, underscores, dashes, and numbers with spaces
    let cleanText = baseText
        .replace(/[._\-+]/g, " ")       // Turn symbols into spaces
        .replace(/[0-9]/g, "")          // Remove all numeric digits
        .replace(/\s+/g, " ")           // Collapse multiple spaces into one
        .trim();

    if (!cleanText) return "New User";

    // 4. Title Case conversion (Capitalize the first letter of each word)
    return cleanText
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default generateNameFromAccount;
