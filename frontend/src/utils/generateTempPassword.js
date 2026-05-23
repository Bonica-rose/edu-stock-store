const generateTempPassword = (length = 10) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "@$!%*?&";

    const all =
        upper +
        lower +
        numbers +
        special;

    let password = "";

    // Required characters
    password +=
        upper[
            Math.floor(
                Math.random() *
                    upper.length
            )
        ];

    password +=
        lower[
            Math.floor(
                Math.random() *
                    lower.length
            )
        ];

    password +=
        numbers[
            Math.floor(
                Math.random() *
                    numbers.length
            )
        ];

    password +=
        special[
            Math.floor(
                Math.random() *
                    special.length
            )
        ];

    // Remaining characters
    for (let i = 4; i < length; i++) {
        password +=
            all[
                Math.floor(
                    Math.random() *
                        all.length
                )
            ];
    }

    // Fisher-Yates Shuffle
    const passwordArray = password.split("");

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j],] = [passwordArray[j],passwordArray[i],];
    }

    return passwordArray.join("");
};

export default generateTempPassword;