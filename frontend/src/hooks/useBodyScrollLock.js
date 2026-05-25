import { useEffect } from "react";

export const useBodyScrollLock = (isOpen) => {
    useEffect(() => {
        if (!isOpen) return;

        // 1. Capture the original overflow style of the body container
        const originalStyle = window.getComputedStyle(document.body).overflow;

        // 2. Lock body scrolling completely
        document.body.style.overflow = "hidden";

        // 3. Cleanup function restores the original scroll style when modal closes or unmounts
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);
};

export default useBodyScrollLock;
