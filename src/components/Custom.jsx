import React, { useState } from "react";
import Navbar from "./Navbar";

const Custom = () => {
  const [customPara, setCustomPara] = useState("");

  const handleChange = (e) => {
    setCustomPara(e.target.value);
  };

  const onSubmit = () => {
    if (customPara.trim() !== "") {
      alert("Paragpraph submitted successfully!");
      localStorage.setItem("customPara",customPara)
      setCustomPara("");
    } else {
      alert("Please enter a paragraph before submitting.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-col">
        <p>Add Your Paragraph:</p>
        <textarea
          onChange={handleChange}
          value={customPara}
          className="border-2 border-red-500 rounded-lg p-4 mr-5"
          name="w3review"
          rows="4"
          cols="50"
          placeholder="Add your Paragpraph here.."
        />
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>

      </div>
    </div>
  );
};

export default Custom;
