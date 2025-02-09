export type ExerciseT = {
  name: string;
  loadType: string;
  sets: number | undefined;
  reps: number | undefined;
  load: string;
  unit: string;
  notes: string;
  date: number;
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
