# 3DPC Server

Backend services for the 3DPC Workspace, including the PrusaSlicer worker and API.

## PrusaSlicer

The server uses **PrusaSlicer 2.9.1** in a headless Docker container to process uploaded STL files into G-code. Jobs are placed into a shared jobs directory and processed by the worker using the selected printer, filament, and print profiles.

### Required PrusaSlicer Binary

The PrusaSlicer AppImage is **not included in this repository** because of its file size.

Before building the PrusaSlicer container, download:

`PrusaSlicer-2.9.1-x86_64.AppImage`

and place it in:

`server/prusaslicer/`

The file should therefore exist at:

`server/prusaslicer/PrusaSlicer-2.9.1-x86_64.AppImage`

The AppImage is used by the Docker image to run PrusaSlicer without requiring a graphical environment. PrusaSlicer 2.9.1 is an official release from the PrusaSlicer project.

After placing the file in the directory, build and start the service with Docker Compose.

## Services

* **API** — HTTP API for submitting and monitoring slicing jobs.
* **PrusaSlicer Worker** — Watches the shared jobs directory and processes queued jobs.
* **PrusaSlicer** — Headless CLI used to generate G-code from STL files.

## Development

The API can be run locally during development, while the PrusaSlicer worker runs in Docker. The jobs directory can be mounted as a volume so files created by the API are immediately available to the worker without rebuilding the image.
