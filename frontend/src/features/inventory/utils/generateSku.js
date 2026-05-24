const generateSku = (type = "product") => {
    const prefix = type === "asset" ? "AST": "PRD";
    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `${prefix}-${random}`;
};

export default generateSku;