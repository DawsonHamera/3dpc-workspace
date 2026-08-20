#!/bin/bash

set -u

PRUSASLICER_BIN="${PRUSASLICER_BIN:-/opt/prusaslicer/bin/prusa-slicer}"
JOBS_DIR="${PRUSASLICER_JOBS_DIR:-/jobs}"
CONFIG_DIR="${PRUSASLICER_CONFIG_DIR:-/configs}"

echo "PrusaSlicer worker started"
echo "PrusaSlicer: $PRUSASLICER_BIN"
echo "Jobs: $JOBS_DIR"
echo "Configs: $CONFIG_DIR"

if [ ! -x "$PRUSASLICER_BIN" ]; then
    echo "ERROR: PrusaSlicer executable not found:"
    echo "  $PRUSASLICER_BIN"
    exit 1
fi

while true; do
    for dir in "$JOBS_DIR"/*/; do
        [ -d "$dir" ] || continue

        job_id="$(basename "$dir")"

        input="$dir/input.stl"
        meta="$dir/meta.json"

        queued="$dir/queued"
        processing="$dir/processing"
        complete="$dir/complete"
        failed="$dir/failed"

        output="$dir/output.gcode"
        project="$dir/input.3mf"

        if [ ! -f "$queued" ]; then
            continue
        fi

        if [ -f "$processing" ] ||
           [ -f "$complete" ] ||
           [ -f "$failed" ]; then
            continue
        fi

        echo
        echo "Starting job: $job_id"

        if [ ! -f "$input" ]; then
            echo "ERROR: missing input.stl"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        if [ ! -f "$meta" ]; then
            echo "ERROR: missing meta.json"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        printer="$(
            jq -r '.printer // empty' "$meta"
        )"

        filament="$(
            jq -r '.filament // empty' "$meta"
        )"

        profile="$(
            jq -r '.profile // empty' "$meta"
        )"

        echo "  Printer: $printer"
        echo "  Filament: $filament"
        echo "  Print profile: $profile"

        if [ -z "$printer" ] ||
           [ -z "$filament" ] ||
           [ -z "$profile" ]; then

            echo "ERROR: incomplete job metadata"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        printer_config="$CONFIG_DIR/printers/$printer.ini"
        filament_config="$CONFIG_DIR/filaments/$filament.ini"
        print_config="$CONFIG_DIR/prints/$profile.ini"

        if [ ! -f "$printer_config" ]; then
            echo "ERROR: printer config not found:"
            echo "  $printer_config"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        if [ ! -f "$filament_config" ]; then
            echo "ERROR: filament config not found:"
            echo "  $filament_config"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        if [ ! -f "$print_config" ]; then
            echo "ERROR: print config not found:"
            echo "  $print_config"

            rm -f "$queued"
            touch "$failed"

            continue
        fi

        rm -f "$queued"
        touch "$processing"

        echo
        echo "Slicing with:"
        echo "  Printer: $printer"
        echo "  Filament: $filament"
        echo "  Profile: $profile"

        rm -f "$output"

        if "$PRUSASLICER_BIN" \
            --load "$printer_config" \
            --load "$filament_config" \
            --load "$print_config" \
            "$input" \
            --export-gcode \
            --output "$output"; then

            rm -f "$processing"
            touch "$complete"

            echo "Completed job: $job_id"

        else

            rm -f "$processing"
            rm -f "$output"
            touch "$failed"

            echo "Failed job: $job_id"
        fi
    done

    sleep 2
done