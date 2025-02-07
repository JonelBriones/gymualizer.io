export type ExerciseT = {
  name: string;
  loadType: string;
  sets: string;
  reps: string;
  load: string;
  unit: string;
  notes: string;
  // week: string;
  // day: number;
};

export type TemplateT = {
  name: string;
  startDate: any;
  endDate: any;
  weeks?: Week[];
};
export type Week = {
  days: Day[];
};
export type Day = {
  exercises: ExerciseT[];
};
