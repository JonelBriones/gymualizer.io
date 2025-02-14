import { ObjectId, Types } from "mongoose";

export type ExerciseT = {
  name: string;
  loadType: string;
  sets: string;
  reps: string;
  percentageLoad?: string;
  weightLoad?: string;
  rpeLoad?: string;
  unit: string;
};

export type TemplateT = {
  _id: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  weeks: Week[];
};
export type Week = {
  days: Day[];
};
export type Day = {
  date?: Date;
  exercises: ExerciseT[];
  notes?: string;
};
