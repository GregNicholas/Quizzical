import React from "react";

export default function GameForm(props) {
  const [formData, setFormData] = React.useState({
    category: "",
    difficulty: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(formData);
  }

  return (
    <form onSubmit={submitForm} className="form">
      <label htmlFor="category">Choose a category</label>
      <br />
      <div className="select-dropdown">
        <select
          className="dropdown"
          id="category"
          defaultValue="general_9"
          onChange={handleChange}
          name="category"
        >
          <option value="general_9">General Knowledge</option>
          <option value="history_23">History</option>
          <option value="nature_17">Science & Nature</option>
          <option value="computers_18">Science: Computers</option>
          <option value="mathematics_19">Science: Mathematics</option>
          <option value="gadgets_30">Science: Gadgets</option>
          <option value="geography_22">Geography</option>
          <option value="animals_27">Animals</option>
          <option value="sports_21">Sports</option>
        </select>
      </div>
      <label htmlFor="difficulty">Choose a difficulty</label>
      <br />
      <select
        className="dropdown"
        id="difficulty"
        defaultValue="easy"
        onChange={handleChange}
        name="difficulty"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className="btn-container">
        <button className="start-btn">Start Quiz</button>
      </div>
    </form>
  );
}
