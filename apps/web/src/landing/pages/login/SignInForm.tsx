import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonText,
} from "@ionic/react";

import { useState } from "react";

import { isPWAInstalled } from "../../../hooks/useUtils";


type LoginCredentials = {
    email: string;
    password: string;
};


type SignInFormProps = {
    switchToSignUp: () => void;
    onSubmit: (credentials: LoginCredentials) => void;
};


const SignInForm: React.FC<SignInFormProps> = ({
    switchToSignUp,
    onSubmit,
}) => {

    const [formState, setFormState] =
        useState<LoginCredentials>({
            email: "",
            password: "",
        });


    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });


    const handleChange = (
        field: keyof LoginCredentials,
        value: string
    ) => {

        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));

    };


    const validateForm = () => {

        const newErrors = {
            email: "",
            password: "",
        };


        let valid = true;


        if (!formState.email) {
            newErrors.email = "Email is required.";
            valid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formState.email
            )
        ) {
            newErrors.email = "Invalid email format.";
            valid = false;
        }


        if (!formState.password) {
            newErrors.password =
                "Password is required.";

            valid = false;
        }


        setErrors(newErrors);

        return valid;
    };


    const handleSubmit = () => {

        if (validateForm()) {
            onSubmit(formState);
        }

    };


    return (
        <div>

            <h1>
                Sign In
            </h1>


            <IonList lines="none">

                <IonItem>

                    <IonLabel position="stacked">
                        Email
                    </IonLabel>


                    <IonInput
                        type="email"
                        placeholder="Enter your email"
                        value={formState.email}

                        className={
                            errors.email
                                ? "ion-invalid ion-touched"
                                : ""
                        }

                        errorText={
                            errors.email
                        }

                        onIonInput={(e) =>
                            handleChange(
                                "email",
                                e.detail.value ?? ""
                            )
                        }
                    />

                </IonItem>


                <IonItem>

                    <IonLabel position="stacked">
                        Password
                    </IonLabel>


                    <IonInput
                        type="password"
                        placeholder="Enter your password"
                        value={formState.password}

                        className={
                            errors.password
                                ? "ion-invalid ion-touched"
                                : ""
                        }

                        errorText={
                            errors.password
                        }

                        onIonInput={(e) =>
                            handleChange(
                                "password",
                                e.detail.value ?? ""
                            )
                        }
                    />

                </IonItem>

            </IonList>


            <IonButton
                expand="full"
                onClick={handleSubmit}
            >
                Sign In
            </IonButton>


            <IonText color="medium">

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                    }}
                >
                    Don't have an account?{" "}
                    <a onClick={switchToSignUp}>
                        Sign up
                    </a>
                </p>


                {!isPWAInstalled() && (

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >
                        Back to{" "}
                        <a href="/">
                            home
                        </a>
                    </p>

                )}

            </IonText>

        </div>
    );
};


export default SignInForm;