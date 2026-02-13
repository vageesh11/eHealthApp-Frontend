export const hospitals = [
  "Hospital 1",
  "Hospital 2",
  "Hospital 3",
  "Hospital 4",
  "Hospital 5",
];

export const doctors: Record<string, string[]> = {
  "Hospital 1": ["Doctor 1"],
  "Hospital 2": ["Doctor 1", "Doctor 2", "Doctor 3"],
  "Hospital 3": ["Doctor 1", "Doctor 2", "Doctor 3", "Doctor 4", "Doctor 5"],
  "Hospital 4": ["Doctor 1"],
  "Hospital 5": ["Doctor 1"],
};

export const nurses: Record<string, string[]> = {
  "Doctor 1": ["Nurse 1", "Nurse 2", "Nurse 3"],
  "Doctor 2": ["Nurse 1"],
  "Doctor 3": ["Nurse 1"],
  "Doctor 4": ["Nurse 1", "Nurse 2", "Nurse 3"],
  "Doctor 5": ["Nurse 1"],
};
