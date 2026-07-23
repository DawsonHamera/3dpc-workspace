import { useEffect, useRef, useState } from "react";
import { LayoutPanelLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { LoginForm, type LoginData } from "@/components/login-form";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useLogin } from "@/features/auth/hooks/useLogin";

const LoginPage: React.FC = () => {

    const [api, setApi] = useState<CarouselApi>();
    const [activeSlide, setActiveSlide] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);

    const navigate = useNavigate();

    const loginMutation = useLogin();

    const isLoading = loginMutation.isPending;


    const handleLogin = async (credentials: LoginData) => {
        setError(null);

        try {
            await loginMutation.mutateAsync(credentials);

        } catch (error) {
         setError(
            error instanceof Error
                ? error.message
                : "An unexpected error occurred."
        );
        }
    };

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 10000);

        return () => clearInterval(interval);
    }, [api]);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setActiveSlide(api.selectedScrollSnap());
        };

        api.on("select", onSelect);

        // set initial value
        onSelect();

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    useEffect(() => {
        if (!videoRef.current) return;

        if (activeSlide === 1) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [activeSlide]);

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <LayoutPanelLeft className="size-4" />
                        </div>
                        3DPC
                    </a>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm
                            loading={isLoading}
                            onSubmit={(data) => handleLogin(data)}
                            error={error}
                            onSignUp={() => navigate("/register")}
                        />
                    </div>
                </div>
            </div>

            <div className="hidden items-center justify-center overflow-hidden rounded-lg bg-muted lg:flex">
                <Carousel
                    setApi={setApi}
                    className="w-full max-w-xl"
                    opts={{
                        loop: true,
                        duration: 25,
                    }}>
                    <CarouselContent>
                        <CarouselItem>
                            <div className="flex h-[600px] items-center justify-center p-10">
                                <img
                                    src="/images/logo-transparent.png"
                                    alt="3DPC Logo"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
                                <video
                                    src="/videos/intro.mp4"
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="flex h-[600px] items-center justify-center p-10">
                                <img
                                    src="/images/s5s.jpg"
                                    alt="3DPC Logo"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};


export default LoginPage;