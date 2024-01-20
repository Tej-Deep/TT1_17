import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'rsuite';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        title: "",
        budget: "", // Set initial budget as a float
        country: "",
        destinations: [
          { place: "", cost: "", notes: "" }, // Set initial cost as a float
        ],
      });
      const allDestinationsEmpty = formData.destinations.every(
        (destination) =>
          destination.place.trim() === "" &&
          destination.cost.trim() === "" &&
          destination.notes.trim() === ""
      );
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Handle specific data type conversion
        const updatedValue = name === "budget" || name === "destinations" ? parseFloat(value) : value;
    
        setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
      };
    
      const handleDestinationChange = (event, index, property) => {
        const { value } = event.target;
    
        // Handle specific data type conversion
        const updatedValue = property === "cost" ? parseFloat(value) : value;
    
        setFormData((prevFormData) => {
          const updatedDestinations = [...prevFormData.destinations];
          updatedDestinations[index][property] = updatedValue;
          return { ...prevFormData, destinations: updatedDestinations };
        });
      };
    
      const handleAddDestination = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          destinations: [...prevFormData.destinations, { place: "", cost: "", notes: "" }],
        }));
      };
    
      const handleRemoveDestination = (index) => {
        setFormData((prevFormData) => {
          const updatedDestinations = [...prevFormData.destinations];
          updatedDestinations.splice(index, 1);
          return { ...prevFormData, destinations: updatedDestinations };
        });
      };

    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (allDestinationsEmpty) {
          // If all destination fields are empty, prevent submission
          alert("Please fill in at least one destination before submitting.");
          return;
        }
        console.log(formData);
        /*axios.post("https://localhost:4000/register", formData)
        .then((response) => {
            console.log(response)
        }).catch((err) => {
            console.error("Error submitting form:", err);
          })*/
      };
      return (
        <div className='container'>
          <h1>Create Itenary</h1>
            <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="budget">Budget:</label>
            <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="destinations">Destinations:</label>
            {formData.destinations.map((destination, index) => (
              <div className="container-with-border" key={index}>
                <label>Place:</label>
                <input
                  type="text"
                  id={`place-${index}`}
                  name={`place-${index}`}
                  value={destination.place}
                  onChange={(e) => handleDestinationChange(e, index, "place")}
                />
    
                <label>Cost:</label>
                <input
                  type="number"
                  id={`cost-${index}`}
                  name={`cost-${index}`}
                  value={destination.cost}
                  onChange={(e) => handleDestinationChange(e, index, "cost")}
                />
    
                <label>Notes:</label>
                <textarea
                  id={`notes-${index}`}
                  name={`notes-${index}`}
                  value={destination.notes}
                  onChange={(e) => handleDestinationChange(e, index, "notes")}
                />
    
                <button type="button" onClick={() => handleRemoveDestination(index)}>
                  Remove
                </button>
              </div>
            ))}
            <></>
            <button type="button" onClick={handleAddDestination}>
              Add Destination
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
        </div>
      );
};

export default Form;
