import React from "react";

const SingleExercise = ({ name, sets, reps, loading, description }: any) => {
  return (
    <div className="flex gap-4 place-items-center">
      <div className="border size-14">image</div>
      <div className="flex flex-col">
        <h4 className="text-[16px] font-medium">{name}</h4>
        <span className="text-neutral-600">{`${sets} x ${reps} at ${loading} of ${description}`}</span>
      </div>
    </div>
  );
};

export default SingleExercise;
