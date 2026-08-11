import React, { useState } from 'react'
// import data from "../DB/Delete.json"
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom';
const Delete = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [popup, setPopUp] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [search, setSearch] = useState("");
  const handleSubmit = async () => {
    if (regNo === "") {
      toast.error("Register no is required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5032/api/Student/${regNo}`);
      if (!response.ok) {
        throw new Error("Student not found");
      }
      setHasSearched(true);
      toast.success("Student Found!!");
      const result = await response.json();
      setSearch(result);
    } catch (error) {
      console.log(error);
      toast.error("Unable to find the student record");
    }
  };
  const handleDelete = async () => {
    if (regNo === "") {
      throw new Error("Register no mandatory");
    }
    try {
      const response = await fetch(`http://localhost:5032/api/Student/${regNo}`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Cant able to delete the reocrd");
      }
      toast.success("Student record deleted!!");
    } catch (error) {
      console.log(error);
      toast.error("Error in deletion process");
    }
  }
  const handleClick = (student) => {
    setIsPopUp(true);
    setPopUp(student)
  };
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div>
      <>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          closeOnClick={false}
          pauseOnHover={true}
          transition={Bounce}
          theme='light'
        />
      </>
      <div className="delete-container">
        <div className="delete-top">
          <h2>Enter the Student's Register Number to Delete</h2>
          <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
          <button type='submit' onClick={handleSubmit}>Search</button>
        </div>
        <div className="delete-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Department</th>
                <th>Year</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {
                hasSearched ?
                  (<tr>
                    <td onClick={() => handleClick(search)}>{search.name}</td>
                    <td>{search.regNo}</td>
                    <td>{search.department}</td>
                    <td>{search.year}</td>
                    <td>{search.age}</td>
                    <td>{search.gender}</td>
                  </tr>)
                  :
                  (
                    <tr>
                      <td colSpan='6'>No Student were found!!</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
        <div className={isPopUp ? "delete-popup show" : "delete-popup"}>
          {isPopUp &&
            <>
              <p>{popup.name}</p>
              <p>{popup.dept}</p>
              <p>{popup.year}</p>
              <p>{popup.age}</p>
              <p>{popup.gender}</p>
              <button type='submit' onClick={handleDelete}>Delete</button>
            </>
          }
        </div>
      </div>
      <div className="dash-btn">
        <button type='submit' onClick={handleNavigate}>Back to Home</button>
      </div>
    </div >
  )
}

export default Delete