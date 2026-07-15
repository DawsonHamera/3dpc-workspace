import {
    IonButton,
    IonContent,
    IonIcon,
    IonPage,
    useIonRouter,
} from "@ionic/react";
import React, { useRef } from "react";

import { chevronDown, leaf } from "ionicons/icons";
// import EventCarousel from "../app/Events/EventCarousel";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
    const contentRef = useRef<HTMLIonContentElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const recycleSectionRef = useRef<HTMLDivElement>(null);
    const recycledStatsRef = useRef<HTMLDivElement>(null);

    const router = useIonRouter();

    // // Using animation preset with custom options
    // useScrollAnimation(contentRef, containerRef, {
    //     selector: ".fade-in",
    //     ...slideInLeft,
    // });
    // useScrollAnimation(contentRef, recycleSectionRef, {
    //     selector: ".animate-scroll",
    //     ...slideInRight,
    // });

    // useGSAP(
    //     () => {
    //         if (!contentRef.current || !recycledStatsRef.current) return;

    //         contentRef.current.getScrollElement().then((scrollElement) => {
    //             const obj = { val: 0 };
    //             gsap.to(obj, {
    //                 val: 100, // Target number
    //                 scrollTrigger: {
    //                     trigger: recycledStatsRef.current,
    //                     start: "top center",
    //                     once: true,
    //                     scroller: scrollElement,
    //                 },
    //                 duration: 2,
    //                 ease: "power3.out",
    //                 onUpdate: () => {
    //                     if (recycledStatsRef.current) {
    //                         recycledStatsRef.current.textContent = Math.floor(
    //                             obj.val,
    //                         ).toLocaleString();
    //                     }
    //                 },
    //             });
    //         });
    //     },
    //     { dependencies: [] },
    // );

    // const handleScrollToContent = () => {
    //     containerRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        <IonPage>
            <IonContent ref={contentRef}>
                <div
                    style={{
                        backgroundColor: "var(--ion-color-primary)",
                        width: "100%",
                        padding: "20px",
                        paddingTop: "80px",
                        paddingBottom: "40px",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "1.5rem",
                        }}
                    >
                        Welcome to the
                    </h1>
                    <h1
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            fontSize: "5rem",
                            fontFamily: "Arial, sans-serif",
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        3DPC
                    </h1>
                    <img
                        src="/images/logo-transparent.png"
                        alt="3DPC Logo"
                        style={{
                            width: "300px",
                            height: "300px",
                            marginTop: "10px",
                            marginBottom: "30px",
                        }}
                    />

                    <IonButton
                        color="light"
                        className={styles.heroButton}
                        onClick={() => router.push("/dashboard")}
                    >
                        Members
                    </IonButton>
                    <IonButton
                        color="light"
                        fill="outline"
                        className={styles.heroButton}
                        onClick={() => router.push("/shop?type=teachers")}
                    >
                        Teachers
                    </IonButton>
                    <IonButton
                        color="light"
                        fill="outline"
                        className={styles.heroButton}
                        onClick={() => router.push("/shop")}
                    >
                        Customers
                    </IonButton>
                    <IonButton
                        fill="clear"
                        color="light"
                        className={styles.heroButton}
                        onClick={() => {}}
                    >
                        Learn more
                        <IonIcon icon={chevronDown} />
                    </IonButton>
                </div>

                <section
                    ref={containerRef}
                    style={{
                        padding: "20px",
                    }}
                >
                    <div
                        className="fade-in"
                        style={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            borderRadius: "4px",
                            marginBottom: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <h1>Who are we?</h1>
                        <p>
                            The 3D Printing Club (3DPC) is a Del Oro club
                            focused around 3D printing-related activities and
                            CAD design. We have lots of workshops where members
                            get to design and 3D print items that are used for a
                            fun project! Our money is generated by 3D printing
                            and selling items at football games and other
                            fundraisers.
                        </p>
                        <img
                            src="/images/s5s.jpg"
                            alt="3DPC Club"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "4px",
                            }}
                        />
                    </div>

                    <div
                        className="fade-in"
                        style={{
                            background: "var(--ion-color-primary)",
                            boxShadow: "0 8px 24px rgba(58, 128, 242, 0.25)",
                            padding: "40px 24px",
                            borderRadius: "16px",
                            marginBottom: "20px",
                            marginTop: "20px",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "-50%",
                                right: "-20%",
                                width: "300px",
                                height: "300px",
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                                borderRadius: "50%",
                            }}
                        />
                        <div
                            style={{
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    background: "#10b981",
                                    color: "white",
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    fontSize: "0.9rem",
                                    fontWeight: "700",
                                    marginBottom: "16px",
                                    boxShadow:
                                        "0 2px 8px rgba(16, 185, 129, 0.3)",
                                }}
                            >
                                Now Open!
                            </div>
                            <h1
                                style={{
                                    color: "white",
                                    fontSize: "2.5rem",
                                    fontWeight: "800",
                                    margin: "16px 0",
                                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                Shop 3D Printed Products
                            </h1>
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.95)",
                                    fontSize: "1.1rem",
                                    lineHeight: "1.6",
                                    maxWidth: "500px",
                                    margin: "0 auto 24px",
                                }}
                            >
                                Browse our collection of innovative 3D printed
                                items made by club members. Order online for
                                pickup at Del Oro High School.
                            </p>
                            <IonButton
                                color="light"
                                style={{
                                    fontWeight: "700",
                                    fontSize: "1.05rem",
                                    height: "52px",
                                    minWidth: "200px",
                                    margin: "8px auto",
                                    borderRadius: 16,
                                    boxShadow:
                                        "0 4px 16px rgba(255, 255, 255, 0.3)",
                                }}
                                onClick={() => router.push("/shop")}
                            >
                                Visit Shop
                            </IonButton>
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.7)",
                                    fontSize: "0.85rem",
                                    marginTop: "16px",
                                    marginBottom: "0",
                                }}
                            >
                                💵 Cash only • Pick up at school
                            </p>
                        </div>
                    </div>

                    {/* <div className="fade-in">
            <h1>Upcoming Events</h1>
            <EventCarousel events={upcomingEvents || []} />
          </div> */}
                </section>
                <section
                    ref={recycleSectionRef}
                    style={{
                        padding: "20px",
                        backgroundColor: "var(--ion-color-success)",
                    }}
                >
                    <h1
                        ref={recycledStatsRef}
                        style={{
                            margin: "15px 0 0 0",
                            textAlign: "center",
                            fontWeight: 800,
                            fontSize: "3rem",
                            fontFamily: "Arial, sans-serif",
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        0
                    </h1>
                    <h2
                        style={{
                            margin: "10px 0 0 0",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            color: "white",
                        }}
                    >
                        <IonIcon icon={leaf} /> Bottles Recycled
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "0.8rem",
                                color: "white",
                                maxWidth: "400px",
                                margin: "0 0 40px 0",
                            }}
                        >
                            *This is a fake number for now to demonstrate the
                            animation. The actual bottle recycling program is
                            set to launch in the near future.
                        </p>
                    </div>

                    <div
                        className="animate-scroll"
                        style={{
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            borderRadius: "8px",
                            background: "white",
                            padding: "24px",
                            marginBottom: "12px",
                        }}
                    >
                        <p>
                            As an ongoing initiative, we are dedicated to
                            reducing waste and promoting sustainability through
                            the recycling of plastic bottles into filament. We
                            turn the plastic waste collected from our community
                            into useful prints for school projects, club
                            activities, and fun items like fidget toys.
                        </p>
                        <img
                            src="/images/recreator.webp"
                            alt="Recreator Machine"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "4px",
                                marginTop: "10px",
                            }}
                        />
                        <p>
                            By transforming discarded bottles into valuable
                            resources, we help keep our environment clean and
                            demonstrate how everyday waste can be repurposed
                            into something practical and creative.
                        </p>
                    </div>

                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                What Types Of Bottles Can Be Recycled?
                            </h2>
                            <p>
                                Larger PET bottles such as one gallon water
                                bottles, two liter soda bottles, and large
                                cooking oil bottles are best for recycling. You
                                can identify a PET bottle by locating a "1"
                                inside of a recycling logo imprinted on the
                                bottle.
                            </p>
                        </div>
                    </div>
                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                Where Can The Bottles Be Dropped Off?
                            </h2>
                            <p>
                                Bottles can be dropped off for recycling in the
                                front office. Look for a light blue trash bin
                                with "3DPC" text. Please ask the front office
                                staff for help if you are having trouble finding
                                it.
                            </p>
                        </div>
                    </div>
                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                Do I Need To Clean The Bottles Before Recycling
                                Them?
                            </h2>
                            <p>No, we'll do that for you.</p>
                        </div>
                    </div>
                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                What Happens To Bottles That Cannot Be Turned
                                Into Filament?
                            </h2>
                            <p>
                                Excess bottles, unusable bottles, and bottle
                                scraps will be collected and industrially
                                recycled. Proceeds from these items being
                                recycled will go directly to the 3DPC.
                            </p>
                        </div>
                    </div>
                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                What Will These Bottles Be Used To Make?
                            </h2>
                            <p>
                                The recycled bottle filament will be used to
                                print items, including fidget toys which will be
                                sold at football games to fund the 3DPC.
                            </p>
                        </div>
                    </div>
                    <div
                        className="animate-scroll"
                        style={{ marginBottom: "20px" }}
                    >
                        <div
                            style={{
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                borderRadius: "8px",
                                background: "white",
                                padding: "24px",
                                marginBottom: "12px",
                            }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                How Will These Bottles Be Turned Into Filament?
                            </h2>
                            <p>
                                Using a pultrusion system printed and assembled
                                by 3DPC members, a plastic bottle is cut into
                                one long strip, melted into a 1.75mm tube, and
                                wound up, ready to be used in a 3D print. All
                                the work is done by 3DPC members.
                            </p>
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
