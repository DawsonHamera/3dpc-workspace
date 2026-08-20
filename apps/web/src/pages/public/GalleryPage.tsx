import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { GalleryLightbox } from "./GalleryLightBox";

const galleryItems = [
    {
        title: "Recreator Recycling Project",
        category: "Engineering",
        image: "/images/recreator.webp",
    },
    {
        title: "Student Design",
        category: "CAD",
        image: "/images/gallery/maze-cad.png",
    },
    {
        title: "Selling 3D Prints",
        category: "Fundraising",
        image: "/images/gallery/fundraising.jpg",
    },
    {
        title: "Club Workshop",
        category: "Community",
        image: "/images/gallery/workshop.jpg",
    },
    {
        title: "Printer HQ",
        category: "Club Resources",
        image: "/images/gallery/printerhq.jpg",
    },
    {
        title: "Custom Plant Pots",
        category: "Events",
        image: "/images/gallery/plantpots.jpg",
    },
];

export default function GalleryPage() {

    const [selectedImage, setSelectedImage] = useState<{
        title: string;
        image: string;
    } | null>(null);

    return (
        <div className="container mx-auto px-6 py-16">

            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold">
                    Gallery
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Explore projects, creations, and moments from the
                    3D Printing Club.
                </p>
            </div>


            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {galleryItems.map((item) => (
                    <div
                        key={item.title}
                        onClick={() => setSelectedImage(item)}
                        className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl bg-muted"
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/20
                            to-transparent
                            transition-opacity
                            group-hover:from-black/80
                        " />

                        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                            <Badge className="mb-3 bg-white/20 text-white">
                                {item.category}
                            </Badge>

                            <h2 className="text-xl font-semibold">
                                {item.title}
                            </h2>
                        </div>
                    </div>
                ))}

            </div>
            <GalleryLightbox
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}