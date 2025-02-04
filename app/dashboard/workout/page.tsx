import SelectOptions from "@/components/SelectOptions";
import { SelectDemo } from "@/components/shadcn/SelectDemo";
import React from "react";

const page = () => {
  const workout = {
    id: "001",
    day: 2,
    exercises: [
      {
        name: "Squat",
      },
      {
        name: "Lunges",
      },
      {
        name: "Tricep-extension",
      },
    ],
    summaryNote: "Leg day was brutal today",
  };
  const { id, day, exercises } = workout;
  return (
    <div className="bg-red-50 w-full p-8">
      {/* THIS PAGE VIEWS THE SCHEDULE WORKOUT OF THE DAY */}
      <h4>Day {day}</h4>

      <form className="flex flex-col gap-10">
        {exercises.map(({ name }) => (
          <div className="flex gap-10">
            <span className="w-[200px] bg-blue-50">{name}</span>
            <div className="flex">
              <label htmlFor="sets">Sets</label>
              {/* <input type="number" name="sets" /> */}
              <SelectOptions />
            </div>
            <div className="flex">
              <label htmlFor="reps">Reps</label>
              {/* <input type="number" name="reps" /> */}
              <SelectOptions />
            </div>
            <div className="flex">
              <label htmlFor="weight">Weight</label>
              <SelectOptions />
              {/* <input type="number" name="weight" /> */}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default page;
