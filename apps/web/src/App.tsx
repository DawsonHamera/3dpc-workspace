import { RouterProvider } from "react-router-dom";
import { OneSignalProvider } from "./services/OneSignalProvider";
import { router } from "./router";

const App = () => {
    return (
        <OneSignalProvider>
            <RouterProvider router={router} />
        </OneSignalProvider>
    );
};

export default App;