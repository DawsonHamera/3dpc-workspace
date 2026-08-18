export type PrinterConfig = {
  id: string;
  name: string;
  vendor: string;
  model: string;
  profile: string;
};

export const printers: PrinterConfig[] = [
  {
    id: "ender-3",
    name: "Creality Ender-3",
    vendor: "Creality",
    model: "ENDER3",
    profile: "ENDER3",
  },
  {
    id: "ender-3-v3-se",
    name: "Creality Ender-3 V3 SE",
    vendor: "Creality",
    model: "ENDER3V3SE",
    profile: "ENDER3V3SE",
  },
  {
    id: "cr-10",
    name: "Creality CR-10",
    vendor: "Creality",
    model: "CR10",
    profile: "CR10",
  },
  {
    id: "ultimaker-s5",
    name: "Ultimaker S5",
    vendor: "Ultimaker",
    model: "ULTIMAKERSline",
    profile: "ULTIMAKERSline",
  },
];

export function getPrinter(id: string) {
  return printers.find((printer) => printer.id === id) ?? null;
}