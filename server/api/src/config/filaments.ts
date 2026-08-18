export type FilamentConfig = {
  id: string;
  name: string;
  type: string;
  profile: string;
};

export const filaments: FilamentConfig[] = [
  {
    id: "pla",
    name: "PLA",
    type: "PLA",
    profile: "Generic PLA",
  },
  {
    id: "petg",
    name: "PETG",
    type: "PETG",
    profile: "Generic PETG",
  },
  {
    id: "abs",
    name: "ABS",
    type: "ABS",
    profile: "Generic ABS",
  },
  {
    id: "tpu",
    name: "TPU",
    type: "TPU",
    profile: "Generic TPU",
  },
];

export function getFilament(id: string) {
  return filaments.find((filament) => filament.id === id) ?? null;
}