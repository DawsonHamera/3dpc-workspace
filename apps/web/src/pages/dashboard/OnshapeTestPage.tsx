import { useDisconnectOnshape, useConnectOnshape, useOnshapeConnection } from "@/features/onshape/hooks";

export default function OnshapeTestPage() {

    const {
        data,
        isLoading,
        isError,
    } =
        useOnshapeConnection();


    const connectOnshape =
        useConnectOnshape();


    const disconnectOnshape =
        useDisconnectOnshape();



    if (isLoading) {
        return (
            <main className="p-6">
                Loading Onshape connection...
            </main>
        );
    }



    if (isError) {
        return (
            <main className="p-6">
                Failed to load Onshape connection.
            </main>
        );
    }



    return (
        <main className="p-6 space-y-6">

            <div>
                <h1 className="text-2xl font-semibold">
                    Onshape Integration
                </h1>

                <p className="text-muted-foreground">
                    OAuth connection test
                </p>
            </div>


            <div className="rounded-lg border p-4">

                <p>
                    Status:{" "}

                    {data?.connected
                        ? "Connected"
                        : "Not connected"}
                </p>

            </div>


            {!data?.connected && (
                <button
                    type="button"
                    onClick={connectOnshape}
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                    Connect Onshape
                </button>
            )}


            {data?.connected && (
                <button
                    type="button"
                    onClick={() =>
                        disconnectOnshape.mutate()
                    }
                    disabled={
                        disconnectOnshape.isPending
                    }
                    className="rounded-md border px-4 py-2"
                >
                    {disconnectOnshape.isPending
                        ? "Disconnecting..."
                        : "Disconnect Onshape"}
                </button>
            )}

        </main>
    );
}