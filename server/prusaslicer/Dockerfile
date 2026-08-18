# ============================================================
# PrusaSlicer worker
# ============================================================

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# ------------------------------------------------------------
# Runtime dependencies
# ------------------------------------------------------------

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libglu1-mesa \
    libgtk-3-0 \
    libdbus-1-3 \
    libx11-6 \
    libxext6 \
    libxrender1 \
    libxrandr2 \
    libxinerama1 \
    libxi6 \
    libxfixes3 \
    libxkbcommon0 \
    && \
    rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------
# PrusaSlicer AppImage
# ------------------------------------------------------------

COPY PrusaSlicer-2.9.1-x86_64.AppImage /tmp/prusaslicer.AppImage

RUN chmod +x /tmp/prusaslicer.AppImage && \
    cd /tmp && \
    ./prusaslicer.AppImage --appimage-extract && \
    mv /tmp/squashfs-root /opt/prusaslicer && \
    ln -s /opt/prusaslicer/AppRun /usr/local/bin/prusa-slicer && \
    rm /tmp/prusaslicer.AppImage

# ------------------------------------------------------------
# Worker
# ------------------------------------------------------------

COPY worker.sh /usr/local/bin/worker.sh

RUN chmod +x /usr/local/bin/worker.sh

# ------------------------------------------------------------
# Jobs
# ------------------------------------------------------------

WORKDIR /jobs

# ------------------------------------------------------------
# Start worker
# ------------------------------------------------------------

ENTRYPOINT ["/bin/bash", "/usr/local/bin/worker.sh"]