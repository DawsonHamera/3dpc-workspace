#!/bin/bash

set -e

DATA_DIR="${PRUSASLICER_DATA_DIR:-/var/lib/prusaslicer}"
PROFILE_DIR="${PRUSASLICER_PROFILE_DIR:-/opt/prusaslicer/usr/resources/profiles}"

echo "Initializing PrusaSlicer data directory: $DATA_DIR"

mkdir -p "$DATA_DIR/vendor"

for vendor in Creality Ultimaker; do
    source="$PROFILE_DIR/$vendor.ini"
    destination="$DATA_DIR/vendor/$vendor.ini"

    if [ ! -f "$source" ]; then
        echo "WARNING: Vendor bundle not found: $source"
        continue
    fi

    if [ ! -f "$destination" ]; then
        echo "Installing vendor bundle: $vendor"
        cp "$source" "$destination"
    else
        echo "Vendor bundle already installed: $vendor"
    fi
done

echo "PrusaSlicer vendor bundles:"
find "$DATA_DIR/vendor" -maxdepth 1 -type f -name '*.ini' -print

echo "PrusaSlicer data directory ready"