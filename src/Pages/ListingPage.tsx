import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ListingPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data } = await axios.get(API_URL + "/fetchpostedWork");
    setTasks(data);
    setLoading(false);
  };

  const getExpertiseList = (expertiseRequired: string) => {
    return expertiseRequired
      .split(",")
      .map((i) => i.trim())
      .join(", ");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showToast = () => {
    toast.success(
      "Thanks for showing interest. Concerned Manger or Director will connect you soon.",
      {
        position: toast.POSITION.TOP_RIGHT, // You can customize the position
        autoClose: 3000,
      }
    );
  };

  // const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");

  // let email: string = user?.split("@")[0] || "";
  // const userName = email.replace(".", " ");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pb-4 listing">
          <h2 className="ukg-color">Published Work</h2>
          <div className="mt-4 ms-4">
            {tasks.map((task, index) => {
              return (
                <div key={"task" + index} className="pb-3 task-container">
                  <h5 className="ukg-color">{task.description}</h5>
                  <div>
                    Number of days required: <strong>{task.hourstogive}</strong>
                  </div>
                  <div>
                    People Needed: <strong>{task.peoplesNeeded}</strong>
                  </div>
                  <div>
                    Expertise Required:{" "}
                    <strong>{getExpertiseList(task.expertiseRequired)}</strong>
                  </div>

                  <div>
                    Perks Offered: <strong>{task.extraperk}</strong>
                  </div>
                  <div>
                    Created By: <strong>{task.designation}</strong>
                  </div>

                  {role === "developer" && (
                    <div className="mt-2 mb-2">
                      <Button className="submit-button" onClick={showToast}>
                        I am interested
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ListingPage;
