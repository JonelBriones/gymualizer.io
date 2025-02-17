import { ObjectId, Types } from "mongoose";

export type ExerciseT = {
  name: string;
  loadType: string;
  weightMax: string | undefined;
  weight: string | undefined;
  sets: string;
  reps: string;
  unit: string;
  notes: string;
  date: Date | null;
  setWeight: Number[];
  _id?: Types.ObjectId;
};

export type TemplateT = {
  _id: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  weeks: Week[];
};

export type Week = {
  _id: Types.ObjectId;
  days: Day[];
};
export type Day = {
  _id: Types.ObjectId;
  date?: Date;
  exercises: ExerciseT[];
  notes?: string;
  workout_notes?: string;
};
export type ToggleWeekDayId = {
  week: Types.ObjectId | null;
  day: Types.ObjectId | null;
};
