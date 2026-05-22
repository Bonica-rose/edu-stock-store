export const formatDate = (
    date,
    locale = "en-CA"
) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
        locale
    );
};