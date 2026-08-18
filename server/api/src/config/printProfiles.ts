export type PrintProfile = {
  id: string;
  name: string;
  layerHeight: number;
};

export const printProfiles: PrintProfile[] = [
  {
    id: "0.15mm",
    name: "0.15mm Detail",
    layerHeight: 0.15,
  },
  {
    id: "0.20mm",
    name: "0.20mm Standard",
    layerHeight: 0.2,
  },
  {
    id: "0.28mm",
    name: "0.28mm Draft",
    layerHeight: 0.28,
  },
];

export function getPrintProfile(id: string) {
  return printProfiles.find((profile) => profile.id === id) ?? null;
}