import React from "react";

const SingleExercise = ({
  name,
  sets,
  reps,
  weight,
  rir,
  rpe,
  units,
  notes,
}: any) => {
  return (
    <div className="flex gap-2">
      <h3>{name}</h3>
      <div className="flex gap-2">
        <span>
          {sets}x{weight}
          {units}
        </span>
        <span>{notes}</span>
      </div>
    </div>
  );
};

export default SingleExercise;
