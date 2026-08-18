#!/bin/bash

set -u

PRUSASLICER_BIN="${PRUSASLICER_BIN:-/opt/prusaslicer/bin/prusa-slicer}"

echo "PrusaSlicer worker started"
echo "PrusaSlicer: $PRUSASLICER_BIN"

if [ ! -x "$PRUSASLICER_BIN" ]; then
    echo "ERROR: PrusaSlicer executable not found: $PRUSASLICER_BIN"
    exit 1
fi

while true; do
    for dir in /jobs/*/; do
        [ -d "$dir" ] || continue

        input="${dir%/}/input.stl"
        queued="${dir%/}/queued"
        processing="${dir%/}/processing"
        complete="${dir%/}/complete"
        failed="${dir%/}/failed"
        output="${dir%/}/output.gcode"

        if [ ! -f "$queued" ]; then
            continue
        fi

        if [ -f "$processing" ] || [ -f "$complete" ] || [ -f "$failed" ]; then
            continue
        fi

        if [ ! -f "$input" ]; then
            echo "Job $(basename "$dir") has no input.stl"
            rm -f "$queued"
            touch "$failed"
            continue
        fi

        job_id="$(basename "$dir")"

        echo "Starting job: $job_id"

        rm -f "$queued"
        touch "$processing"

        if "$PRUSASLICER_BIN" \
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