import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { useSendHeartbeatMutation } from "../features";

const useHeartbeat = (userId: any) => {
    const [sendHeartbeatApi] = useSendHeartbeatMutation();
    const router = useIonRouter();

    useEffect(() => {
        // Early return if no userId (prevents further setup)
        if (!userId) return;

        // Function to send heartbeat request to the server
        const sendHeartbeat = async () => {
            try {
                const response = await sendHeartbeatApi(userId).unwrap();
                console.log("Sent out heartbeat");
            } catch (error: any) {
                if (error.originalStatus === 502) {
                    console.log("API is down, no heartbeat sent");
                } else {
                    console.error("Error sending heartbeat:", error);
                }
                // router.push("/dashboard/construction")
            }
        };

        // Send the heartbeat immediately when the component mounts
        sendHeartbeat();

        // Start the heartbeat (5-minute interval)
        const intervalId = setInterval(() => {
            sendHeartbeat(); // Send the heartbeat every 5 minutes
        }, 300000); // 5 minutes in milliseconds

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [userId]);
};

export default useHeartbeat;
