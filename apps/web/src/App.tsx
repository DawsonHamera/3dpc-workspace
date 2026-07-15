import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import HomePage from "./landing/pages/home/HomePage";
import LoginPage from "./landing/pages/login/LoginPage";
import "./theme/variables.css";
import { isPWAInstalled } from "./hooks/useUtils";
import { useAuth } from "./features/auth/hooks/useAuth";
import { OneSignalProvider } from "./services/OneSignalProvider";
import {
  Redirect,
  Route,
} from "react-router";

setupIonicReact();

const HomeRoute: React.FC = () => {
    const currentUser = useAuth().data;
    const isInstalled = isPWAInstalled();
    return currentUser && isInstalled ? (
        <Redirect to="/dashboard" />
    ) : (
        <HomePage />
    );
};

const App: React.FC = () => {
    return (
        <IonApp>
            <OneSignalProvider>
                    <IonReactRouter>
                        <IonRouterOutlet>
                                <Route path="/" component={HomeRoute} />
                                <Route path="/login" component={LoginPage} />
                        </IonRouterOutlet>
                    </IonReactRouter>
            </OneSignalProvider>
        </IonApp>
    );
};

export default App;
