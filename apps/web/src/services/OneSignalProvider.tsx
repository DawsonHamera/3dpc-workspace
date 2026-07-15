import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import OneSignal from "react-onesignal";

type User = {
    id: number;
    name: string;
    email: string;
    grade?: string;
    meta?: Record<string, unknown>;
    role: {
        id: number;
        name: string;
    };
};

interface OneSignalContextType {
    isSubscribed: boolean;
    loading: boolean;
    subscribe: (user: User) => Promise<boolean>;
    unsubscribe: () => Promise<boolean>;
    checkSubscription: () => Promise<boolean>;
}

const OneSignalContext = createContext<OneSignalContextType | undefined>(
    undefined
);

export const useOneSignal = () => {
    const ctx = useContext(OneSignalContext);
    if (!ctx)
        throw new Error("useOneSignal must be used within OneSignalProvider");
    return ctx;
};

export const OneSignalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Initialize OneSignal on mount
    useEffect(() => {
        // Wait for service worker to be ready before initializing OneSignal
        const initOneSignal = async () => {
            if (typeof window !== "undefined" && "serviceWorker" in navigator) {
                try {
                    // Wait for service worker to be ready
                    console.log("Waiting for service worker to be ready...");
                    await navigator.serviceWorker.ready;

                    // Add additional delay to ensure sw.js is fully loaded
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    console.log(
                        "Service worker ready, initializing OneSignal..."
                    );

                    // Use any type to bypass TypeScript issues with OneSignal config
                    await (OneSignal as any).init({
                        appId: process.env.ONESIGNAL_APP_ID,
                        allowLocalhostAsSecureOrigin: false,

                        // Use standard OneSignal service worker paths
                        serviceWorkerPath: "/OneSignalSDKWorker.js",
                        serviceWorkerUpdaterPath: "/OneSignalSDK.sw.js",

                        // Simple configuration
                        autoResubscribe: false,
                        welcomeNotification: {
                            disable: true,
                        },
                        notifyButton: {
                            enable: false,
                        },
                    });

                    console.log("OneSignal initialized successfully");
                    setInitialized(true);
                } catch (error) {
                    console.error("OneSignal initialization error:", error);
                }
            }
        };

        initOneSignal();
    }, []);

    const checkSubscription = useCallback(async () => {
        setLoading(true);
        try {
            console.log("Checking subscription status...");
            const sub = await OneSignal.User.PushSubscription.optedIn;
            console.log("Subscription status:", sub);
            setIsSubscribed(!!sub);
            return !!sub;
        } finally {
            setLoading(false);
        }
    }, []);

    const subscribe = useCallback(async (user: User) => {
        setLoading(true);
        console.log("Subscribing user to OneSignal:");
        try {
            await OneSignal.User.PushSubscription.optIn();
            await OneSignal.login(String(user.id));
            await OneSignal.User.addTags({
                role: user.role.name,
                username: user.name,
            });
            const sub = await OneSignal.User.PushSubscription.optedIn;
            setIsSubscribed(!!sub);
            return !!sub;
        } finally {
            setLoading(false);
        }
    }, []);

    const unsubscribe = useCallback(async () => {
        setLoading(true);
        try {
            await OneSignal.User.PushSubscription.optOut();
            await OneSignal.logout();
            const sub = await OneSignal.User.PushSubscription.optedIn;
            setIsSubscribed(!!sub);
            return !sub;
        } finally {
            setLoading(false);
        }
    }, []);

    // Check subscription after OneSignal is initialized
    React.useEffect(() => {
        if (initialized) {
            checkSubscription();
        }
    }, [initialized, checkSubscription]);

    return (
        <OneSignalContext.Provider
            value={{
                isSubscribed,
                loading,
                subscribe,
                unsubscribe,
                checkSubscription,
            }}
        >
            {children}
        </OneSignalContext.Provider>
    );
};
