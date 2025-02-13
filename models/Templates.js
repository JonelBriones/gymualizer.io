import { model, models, Schema } from "mongoose";
const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    weeks: [
      {
        exercises: [
          {
            name: {
              name: {
                type: String,
              },
              loadType: {
                type: String,
              },
              sets: {
                type: String,
              },
              reps: {
                type: String,
              },
              unit: {
                type: String,
              },
              notes: {
                type: String,
              },
              additionalNotes: {
                type: String,
              },
            },
          },
        ],
      },
    ],
  },

  { timestamps: true }
);

const Template = models.Template || model("Template", TemplateSchema);
export default Template;
