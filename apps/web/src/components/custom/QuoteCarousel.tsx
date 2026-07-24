import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

type Quote = {
    quote: string;
    name: string;
    role: string;
    initials: string;
};

interface QuoteCarouselProps {
    quotes: Quote[];
    interval?: number;
}

export function QuoteCarousel({
    quotes,
    interval = 6000,
}: QuoteCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;

        const timer = setInterval(() => {
            api.scrollNext();
        }, interval);

        return () => clearInterval(timer);
    }, [api, interval]);

    return (
        <section className="bg-muted/40 py-24">
            <div className="container mx-auto px-6">
                <Carousel
                    setApi={setApi}
                    className="w-full"
                    opts={{
                        loop: true,
                        duration: 25,
                    }}
                >
                    <CarouselContent>
                        {quotes.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="flex justify-center"
                            >
                                <div className="rounded-3xl border bg-background p-10 shadow-sm w-3/4">
                                    <p className="text-2xl leading-10 italic">
                                        “{item.quote}”
                                    </p>

                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                                            {item.initials}
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {item.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}