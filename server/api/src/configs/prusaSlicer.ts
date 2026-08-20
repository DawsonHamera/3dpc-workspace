export const PRUSA_SLICER_PRINTERS = {
  "ender-3": {
    profile: "ENDER3",
    config: "Creality.ini",
  },
  "ender-3-v3-se": {
    profile: "ENDER3V3SE",
    config: "Creality.ini",
  },
  "cr-10": {
    profile: "CR10",
    config: "Creality.ini",
  },
  "ultimaker-s5": {
    profile: "ULTIMAKERSline",
    config: "Ultimaker.ini",
  },
} as const;

export const PRUSA_SLICER_FILAMENTS = {
  pla: "Generic PLA",
  petg: "Generic PETG",
  abs: "Generic ABS",
  tpu: "Generic TPU",
} as const;

export const PRUSA_SLICER_PRINT_PROFILES = {
  "0.20mm": "0.20mm",
  "0.15mm": "0.15mm",
  "0.30mm": "0.30mm",
} as const;

export type PrusaSlicerPrinter = keyof typeof PRUSA_SLICER_PRINTERS;
export type PrusaSlicerFilament = keyof typeof PRUSA_SLICER_FILAMENTS;
export type PrusaSlicerPrintProfile = keyof typeof PRUSA_SLICER_PRINT_PROFILES;