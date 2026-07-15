import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonText,
} from "@ionic/react";

import { useState } from "react";

import { isPWAInstalled } from "../../../hooks/useUtils";


type RegisterData = {
    name: string;
    email: string;
    password: string;
    grade?: string;
};


type FormState = RegisterData & {
    confirm_password: string;
};


type SignUpFormProps = {
    switchToSignIn: () => void;
    onSubmit: (data: RegisterData) => void;
};


const SignUpForm: React.FC<SignUpFormProps> = ({
    switchToSignIn,
    onSubmit,
}) => {

    const [formState, setFormState] =
        useState<FormState>({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            grade: "",
        });


    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        grade: "",
    });


    const handleChange = (
        field: keyof FormState,
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
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            grade: "",
        };


        let valid = true;


        if (!formState.name) {
            newErrors.name =
                "Name is required.";

            valid = false;
        }


        if (!formState.email) {
            newErrors.email =
                "Email is required.";

            valid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formState.email
            )
        ) {

            newErrors.email =
                "Invalid email format.";

            valid = false;
        }


        if (!formState.password) {

            newErrors.password =
                "Password is required.";

            valid = false;

        } else if (
            formState.password.length < 8
        ) {

            newErrors.password =
                "Password must be at least 8 characters.";

            valid = false;
        }


        if (
            formState.password !==
            formState.confirm_password
        ) {

            newErrors.confirm_password =
                "Passwords do not match.";

            valid = false;
        }


        if (!formState.grade) {

            newErrors.grade =
                "Grade selection is required.";

            valid = false;
        }


        setErrors(newErrors);

        return valid;
    };


    const handleSubmit = () => {

        if (!validateForm()) {
            return;
        }


        onSubmit({
            name: formState.name,
            email: formState.email,
            password: formState.password,
            grade: formState.grade,
        });

    };


    return (
        <div>

            <h1>
                Sign Up
            </h1>


            <IonItem>
                <IonLabel position="stacked">
                    Name
                </IonLabel>

                <IonInput
                    value={formState.name}
                    placeholder="Enter your full name"

                    onIonInput={(e) =>
                        handleChange(
                            "name",
                            e.detail.value ?? ""
                        )
                    }
                />

                {errors.name && (
                    <IonNote color="danger">
                        {errors.name}
                    </IonNote>
                )}

            </IonItem>


            <IonItem>

                <IonLabel position="stacked">
                    Email
                </IonLabel>

                <IonInput
                    type="email"
                    value={formState.email}

                    onIonInput={(e) =>
                        handleChange(
                            "email",
                            e.detail.value ?? ""
                        )
                    }
                />

                {errors.email && (
                    <IonNote color="danger">
                        {errors.email}
                    </IonNote>
                )}

            </IonItem>


            <IonItem>

                <IonLabel position="stacked">
                    Password
                </IonLabel>

                <IonInput
                    type="password"
                    value={formState.password}

                    onIonInput={(e) =>
                        handleChange(
                            "password",
                            e.detail.value ?? ""
                        )
                    }
                />

                {errors.password && (
                    <IonNote color="danger">
                        {errors.password}
                    </IonNote>
                )}

            </IonItem>


            <IonItem>

                <IonLabel position="stacked">
                    Verify Password
                </IonLabel>

                <IonInput
                    type="password"
                    value={formState.confirm_password}

                    onIonInput={(e) =>
                        handleChange(
                            "confirm_password",
                            e.detail.value ?? ""
                        )
                    }
                />

                {errors.confirm_password && (
                    <IonNote color="danger">
                        {errors.confirm_password}
                    </IonNote>
                )}

            </IonItem>


            <IonItem>

                <IonLabel position="stacked">
                    Grade
                </IonLabel>


                <IonSelect
                    value={formState.grade}
                    placeholder="Select grade"

                    onIonChange={(e) =>
                        handleChange(
                            "grade",
                            e.detail.value
                        )
                    }
                >

                    <IonSelectOption value="Freshman">
                        Freshman
                    </IonSelectOption>

                    <IonSelectOption value="Sophomore">
                        Sophomore
                    </IonSelectOption>

                    <IonSelectOption value="Junior">
                        Junior
                    </IonSelectOption>

                    <IonSelectOption value="Senior">
                        Senior
                    </IonSelectOption>

                </IonSelect>


                {errors.grade && (
                    <IonNote color="danger">
                        {errors.grade}
                    </IonNote>
                )}

            </IonItem>


            <IonButton
                expand="full"
                onClick={handleSubmit}
            >
                Sign Up
            </IonButton>


            <IonText color="medium">

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                    }}
                >
                    Already have an account?{" "}
                    <a onClick={switchToSignIn}>
                        Sign in
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


export default SignUpForm;