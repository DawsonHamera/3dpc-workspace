import { X } from "lucide-react";
import { useEffect } from "react";

interface GalleryLightboxProps {
    image: {
        title: string;
        image: string;
    } | null;
    onClose: () => void;
}

export function GalleryLightbox({
    image,
    onClose,
}: GalleryLightboxProps) {

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [onClose]);


    if (!image) return null;


    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/80
                p-6
                backdrop-blur-sm
                animate-in
                fade-in
                duration-300
            "
            onClick={onClose}
        >

            <button
                onClick={onClose}
                className="
                    absolute
                    right-6
                    top-6
                    rounded-full
                    bg-white/10
                    p-3
                    text-white
                    transition
                    hover:bg-white/20
                "
            >
                <X className="h-6 w-6" />
            </button>

            <div
                className="
        relative
        max-h-[90vh]
        max-w-[95vw]
        animate-in
        fade-in
        zoom-in-95
        duration-200
    "
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={image.image}
                    alt={image.title}
                    className="
            max-h-[90vh]
            max-w-[95vw]
            rounded-xl
            object-contain
            shadow-2xl
        "
                />

                <div
                    className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-black/60
            px-4
            py-2
            text-sm
            font-medium
            text-white
            backdrop-blur-sm
        "
                >
                    {image.title}
                </div>
            </div>

        </div>
    );
}