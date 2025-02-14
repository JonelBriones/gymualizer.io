import { model, models, Schema } from "mongoose";

const Exercise = new Schema(
  {
    name: String,
    loadType: String,
    sets: String,
    reps: String,
    unit: String,
    notes: String,
    additionalNotes: String,
  },
  { _id: true }
);

const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    weeks: [
      {
        days: [
          {
            summary_notes: { type: String },
            workout_notes: { type: String },
            date: { type: Number },
            exercises: [Exercise],
          },
        ],
      },
    ],
  },

  { timestamps: true }
);

const Template = models.Template || model("Template", TemplateSchema);
export default Template;
