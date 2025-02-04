"use client";
import React, { useState } from "react";
import FAKE_WORKOUTPLAN from "@/data.json";
const TemplateForm = () => {
  const [totalExerciseInputs, setTotalExerciseInputs] = useState(1);
  const [workoutList, setWorkoutList] = useState([]);
  const [workout, setWorkout] = useState({
    name: "",
  });

  const handleAddInput = () => {
    setTotalExerciseInputs(totalExerciseInputs + 1);
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", `exercise${totalExerciseInputs}`);
    newInput.setAttribute("placeholder", "Add exercise");
    const parentElement = document.getElementById("exercise-form");
    parentElement?.appendChild(newInput);
  };
  const handleRemoveInput = () => {
    setTotalExerciseInputs(totalExerciseInputs - 1);
    // const newInput = document.createElement("input")
    // newInput.setAttribute("type","text")
    // newInput.setAttribute("id","exercise")
  };
  console.log(FAKE_WORKOUTPLAN);
  return (
    <div>
      <h1 className="text-4xl">Create Template</h1>
      {/* Templates can be full work out plans or indivual work out days  */}

      <div>
        {/* full Template Cycle
            gives a prompt of questions
            1. How many weeks would you your template to have?
              - select number
            2. How many days would you like to workout each week?
              -select number 1-7
            renders forms to corresponding inputs
      
  */}
        {/* individual exercises per workout */}
      </div>

      <form
        action=""
        id="exercise-form"
        className="
      flex flex-col"
      >
        <div className="flex gap-4">
          <label htmlFor="exercise-1">Add exercise</label>
          <input type="text" name="exercise-1" placeholder="Add exercise" />
        </div>
        <button>Create Workout</button>
      </form>
      <button onClick={handleAddInput}>add another exercise</button>
      {/* <button onClick={handleRemoveInput}>add another exercise</button> */}
    </div>
  );
};

export default TemplateForm;
