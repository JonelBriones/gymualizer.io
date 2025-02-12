import { model, models, Schema } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    template: {
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
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
