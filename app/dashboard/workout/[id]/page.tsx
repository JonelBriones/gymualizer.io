import SelectOptions from "@/components/SelectOptions";
import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const workout = {
    week: 1,
    days: [
      {
        id: "001",
        day: 2,
        exercises: ["Squat", "Lunges", "Tricep-extension"],
        summaryNote: "Leg day was brutal today",
      },
    ],
  };

  //  fetch workout by id
  const { days } = workout;

  return (
    <div className="w-full p-8">
      {/* THIS PAGE VIEWS THE SCHEDULE WORKOUT OF THE DAY */}
      <h4 className="text-2xl">Day {workout.days[0].day}</h4>

      <form className="flex flex-col gap-10 p-5 w-fit">
        {days[0].exercises.map((exercise) => (
          <div className="flex gap-2">
            <span className="flex-grow">{exercise}</span>
            <div className="flex">
              <label htmlFor="sets">Sets:</label>
              <input
                type="number"
                name="sets"
                min={10}
                className="w-[50px] bg-slate-100 border border-neutral-700"
              />
              {/* <SelectOptions /> */}
            </div>
            <div className="flex">
              <label htmlFor="reps">Reps:</label>
              <input
                type="number"
                name="reps"
                min={30}
                className="w-[50px] bg-slate-100 border border-neutral-700"
              />
              {/* <SelectOptions /> */}
            </div>
            <div className="flex">
              <label htmlFor="weight">Weight:</label>
              {/* <SelectOptions /> */}
              <input
                type="number"
                name="weight"
                min={999}
                className="w-[50px] bg-slate-100 border border-neutral-700"
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default page;
