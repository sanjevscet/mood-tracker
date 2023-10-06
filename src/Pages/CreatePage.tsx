import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { API_URL } from "../Constants";

const CreatePage: React.FC = () => {
  const [hoursToGive, setHoursToGive] = useState<number>(0);
  const [peoplesNeeded, setPeoplesNeeded] = useState<number>(0);
  const [textarea, setTextarea] = useState<string>("");
  const [offeredPerk, setOfferedPerk] = useState<string>("");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleHoursToGiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoursToGive(+e.target.value);
  };

  const handlePeoplesNeededChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPeoplesNeeded(+e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };

  const handlePerkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferedPerk(e.target.value);
  };

  // const handlePerkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setOfferedPerk(e.target.value);
  // };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedExpertise(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access form values using hoursToGive, peoplesNeeded, textarea, and offeredPerk states
    console.log("Form submitted:", {
      hoursToGive,
      peoplesNeeded,
      textarea,
      offeredPerk,
      selectedExpertise,
    });

    const { data } = await axios.post(API_URL + "/fetchpostedWork", {
      hoursToGive,
      peoplesNeeded,
      description: textarea,
      perks: offeredPerk,
      expertiseRequired: selectedExpertise,
    });

    console.log(data);

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/list");
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    setHoursToGive(0);
    setPeoplesNeeded(0);
    setTextarea("");
    setOfferedPerk("");
    setSelectedExpertise("");
  };

  return (
    <>
      {isSubmitting ? (
        <Loader />
      ) : (
        <div
          style={{
            marginTop: 40,
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2 className="mb-4">Publish a new Work</h2>
          <form onSubmit={handleSubmit}>
            {/* Description */}
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={textarea}
                onChange={handleTextareaChange}
                required={true}
              />
            </div>
            {/* hourstogive */}
            <div className="mb-3">
              <label htmlFor="hours-to-give" className="form-label">
                Number of days required
              </label>
              <input
                type="number"
                className="form-control"
                id="hours-to-give"
                value={hoursToGive}
                onChange={handleHoursToGiveChange}
                required={true}
              />
            </div>
            {/* peoplesNeeded */}
            <div className="mb-3">
              <label htmlFor="people-required" className="form-label">
                People Required
              </label>
              <input
                type="number"
                className="form-control"
                id="people-required"
                value={peoplesNeeded}
                onChange={handlePeoplesNeededChange}
                required={true}
              />
            </div>

            {/* Perks list */}
            <div className="mb-3">
              <label htmlFor="perks" className="form-label">
                Offered Perks
              </label>

              <input
                type="text"
                className="form-control"
                id="perks"
                value={offeredPerk}
                onChange={handlePerkChange}
                required={true}
              />
            </div>

            {/* Expertise Required */}
            <div className="mb-3">
              <label htmlFor="expertise-list" className="form-label">
                Required Expertise:
              </label>

              <input
                type="text"
                className="form-control"
                id="expertise-list"
                value={selectedExpertise}
                onChange={handleExpertiseChange}
                required={true}
              />
              {/* <select
                id="expertise-list"
                className="form-select"
                aria-label="Default select example"
                defaultValue={selectedExpertise}
                onChange={handleExpertiseChange}
                required={true}
              >
                <option>Select type of Expertise</option>
                <option value="1">Java</option>
                <option value="2">React</option>
                <option value="3">Cloud</option>
                <option value="4">Sql</option>
              </select> */}
            </div>

            {/* Submit and Cancel buttons */}
            <div className="mb-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary me-4 submit-button "
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatePage;
