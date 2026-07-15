import {
    IonAlert,
    IonPage,
    useIonRouter,
} from "@ionic/react";

import { useState } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useLogin } from "../../../features/auth/hooks/useLogin";
import { useRegister } from "../../../features/auth/hooks/useRegister";


type Mode = "signin" | "signup";


type LoginCredentials = {
    email: string;
    password: string;
};


type RegisterCredentials = {
    email: string;
    name: string;
    password: string;
    grade?: string;
};


const LoginPage: React.FC = () => {

    const [mode, setMode] = useState<Mode>("signin");

    const router = useIonRouter();

    const login = useLogin();
    const register = useRegister();


    const [alert, setAlert] = useState({
        isOpen: false,
        title: "",
        message: "",
    });


    const closeAlert = () => {
        setAlert({
            isOpen: false,
            title: "",
            message: "",
        });
    };


    const showError = (
        title: string,
        error: unknown
    ) => {

        const message =
            error instanceof Error
                ? error.message
                : "An unexpected error occurred.";


        setAlert({
            isOpen: true,
            title,
            message,
        });
    };


    const handleSignIn = async (
        credentials: LoginCredentials
    ) => {

        try {

            await login.mutateAsync(credentials);


            router.push(
                "/dashboard",
                "root"
            );


        } catch (error) {

            showError(
                "Login Failed",
                error
            );

        }

    };


    const handleSignUp = async (
        credentials: RegisterCredentials
    ) => {

        try {

            await register.mutateAsync(credentials);


            await login.mutateAsync({
                email: credentials.email,
                password: credentials.password,
            });


            router.push(
                "/dashboard",
                "root"
            );


        } catch (error) {

            showError(
                "Sign-Up Failed",
                error
            );

        }

    };


    return (
        <IonPage>

            <div
                style={{
                    backgroundColor:
                        "var(--ion-color-primary)",
                    width: "100%",
                    padding: "20px",
                    height: "100vh",
                }}
            >

                <img
                    src="/images/logo-transparent.png"
                    alt="3DPC Logo"
                    style={{
                        maxWidth: "100%",
                        width: "auto",
                    }}
                />


                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        width: "90%",
                        maxWidth: "100%",
                        position: "absolute",
                        margin: "0 auto",
                        bottom: "20px",
                        left: "0",
                        right: "0",
                    }}
                >
                    {
                        mode === "signin"

                            ? (
                                <SignInForm
                                    switchToSignUp={() =>
                                        setMode("signup")
                                    }

                                    onSubmit={
                                        handleSignIn
                                    }
                                />
                            )

                            : (

                                <SignUpForm
                                    switchToSignIn={() =>
                                        setMode("signin")
                                    }

                                    onSubmit={
                                        handleSignUp
                                    }
                                />

                            )
                    }


                </div>

            </div>


            <IonAlert

                isOpen={
                    alert.isOpen
                }


                onDidDismiss={
                    closeAlert
                }


                header={
                    alert.title
                }


                message={
                    alert.message
                }


                buttons={[
                    {
                        text: "OK",
                        handler: closeAlert,
                    },
                ]}

            />


        </IonPage>
    );
};


export default LoginPage;