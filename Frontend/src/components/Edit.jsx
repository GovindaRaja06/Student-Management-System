import React, { useState } from 'react'
// import data from "../DB/Studentinfo.json"
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Edit = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [department, setDepartment] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [partStudent, setPartStudent] = useState(null);
  const [isEntered, setIsEntered] = useState(false);
  const [student, setStudent] = useState([]);
  const initialChangeValue = {
    name: false,
    regno: false,
    year: false,
    age: false,
    gender: false,
    fathername: false,
    mothername: false,
    department: false
  }
  const [changeValue, setChangeValue] = useState(initialChangeValue);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    regno: "",
    yaer: "",
    age: "",
    gender: "",
    fathername: "",
    mothername: "",
    department: ""
  });
  const handleValueChange = (e) => {
    if (e.target.name === 'name') {
      setNewData({
        ...newData,
        name: e.target.value
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'regno') {
      setNewData({
        ...newData,
        regno: e.target.regno
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'age') {
      setNewData({
        ...newData,
        age: e.target.age
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'year') {
      setNewData({
        ...newData,
        year: e.target.year
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'fathername') {
      setNewData({
        ...newData,
        fathername: e.target.fathername
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'mothername') {
      setNewData({
        ...newData,
        mothername: e.target.mothername
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
    if (e.target.name === 'department') {
      setNewData({
        ...newData,
        department: e.target.department
      })
      if (e.target.value.trim() === "") {
        setIsEntered(false);
      } else {
        setIsEntered(true);
      }
    }
  }
  const handlechange = (field) => {

    if (field === "name") {
      setChangeValue({
        ...changeValue,
        name: true
      })
    }
    if (field === "age") {
      setChangeValue({
        ...changeValue,
        age: true
      })
    }
    if (field === "department") {
      setChangeValue({
        ...changeValue,
        department: true
      })
    }
    if (field === "gender") {
      setChangeValue({
        ...changeValue,
        gender: true
      })
    }
    if (field === "fathername") {
      setChangeValue({
        ...changeValue,
        fathername: true
      })
    }
    if (field === "mothername") {
      setChangeValue({
        ...changeValue,
        mothername: true
      })
    }
    if (field === "regno") {
      setChangeValue({
        ...changeValue,
        regno: true
      })
    }
    if (field === "year") {
      setChangeValue({
        ...changeValue,
        year: true
      })
    }
  };
  const handleClick = async (student) => {
    setChangeValue({ ...initialChangeValue });
    setPopUp(true);
    setSelectedStudent(student)
    // console.log("Popup clicked")
  };
  const handleRemove = () => {
    setChangeValue(initialChangeValue);
    setPopUp(false)
  };
  const handleToast = async () => {
    if (!selectedStudent) {
      toast.error("No student selected");
      return;
    }

    const studentData = {
      name: newData.name || selectedStudent.name,
      regNo: selectedStudent.regno,
      age: newData.age
        ? Number(newData.age)
        : Number(selectedStudent.age),
      gender: newData.gender || selectedStudent.gender,
      department: newData.department || selectedStudent.dept,
      year: newData.year
        ? Number(newData.year)
        : Number(selectedStudent.year),
      fatherName: newData.fathername || selectedStudent.fathername,
      motherName: newData.mothername || selectedStudent.mothername
    };
    try {
      const response = await fetch(`http://localhost:5032/api/Student/${regNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(studentData)
      });
      if (!response.ok) {
        throw new Error("Unable to find the student");
      }
      const result = await response.json();
      console.log("API REsult",result);
      toast.success("Student Data Updated"); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update data");
    }
  };
  const actualStudent = student.filter(
    (student) => student.department === department && student.year === Number(select)

    // (student) => student.dept === department 
  );
  const handleSearch = async () => {
    setHasSearched(true);
    // const searchValue = student.find(
    //   (student) => student.regno === regNo,
    // );
    // setPartStudent(searchValue)
    // }

    // const getStudentById = async () => {
    if (!select || !department || !regNo) {
      setStudent(null);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5032/api/Student/${regNo}`);
      if (!response.ok) {
        // console.log("Backend Connected!!");
        throw new Error("Student Not Founded");
      }
      const result = await response.json();
      // setStudent(result);
      console.log("Api result:",result);
      setPartStudent(result);
    }
    catch (error) {
      console.log(error);
      setPartStudent(null);
    }
    // setPartStudent(searchValue)
  };

  const handleNaviagte = () => {
    navigate("/");
  };
  // const handleTost = () => {
  //   toast.success("Student Data Has been Changed!!");
  // };
  return (
    <div>
      <>
        <ToastContainer
          autoClose={3000}
          position='top-right'
          pauseOnHover={true}
          closeOnClick={false}
        />
      </>
      <div className="edit-container">
        <div className="year-selection">
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="">Select an year</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>
          {select &&
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>Select the department</option>
              <option>IT</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>CSE</option>
            </select>
          }
          {
            department &&
            <>
              <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
              <button type='submit' onClick={handleSearch}>search</button>
            </>
          }
        </div>
        <div className="table-structure">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Department</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {
                hasSearched ?
                  (
                    partStudent ?
                      (
                        <tr>
                          <td onClick={() => handleClick(partStudent)}>{partStudent.name}</td>
                          <td>{partStudent.regNo}</td>
                          <td>{partStudent.department}</td>
                          <td>{partStudent.age}</td>
                          <td>{partStudent.gender}</td>
                        </tr>
                      ) :
                      (
                        <tr>
                          <td colSpan='5'>No student found!!</td>
                        </tr>
                      )
                  )
                  :
                  // (
                  //   actualStudent.map((student) => (
                  //     <tr key={student.regno}>
                  //       <td onClick={() => handleClick(student)}>{student.name}</td>
                  //       <td>{student.regno}</td>
                  //       <td>{student.dept}</td>
                  //       <td>{student.age}</td>
                  //       <td>{student.gender}</td>
                  //     </tr>
                  //   ))
                  // )
                  (
                    actualStudent.length === 0 ?
                      (
                        <tr>
                          <td colSpan='5'>No student Record found!!</td>
                        </tr>
                      ) :
                      (
                        actualStudent.map((student) => (
                          <tr key={student.regno}>
                            <td onClick={() => handleClick(student)}>{student.name}</td>
                            <td>{student.regno}</td>
                            <td>{student.department}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                          </tr>
                        ))
                      )
                  )
              }
              {/* {
                select && department && actualStudent.length === 0 ?
                  (
                    <tr>
                      <td colSpan="5">No Student Record Found!!</td>
                    </tr>
                  ) :
                  actualStudent.map((student) => (
                    <tr key={student.regno}>
                      <td onClick={() => handleClick(student)}>{student.name}</td>
                      <td>{student.regno}</td>
                      <td>{student.dept}</td>
                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                    </tr>
                  ))
              } */}
            </tbody>
          </table>
        </div>

        {
          popUp &&
          <div className="overlay">
            {/* // <div className='popup-window'> */}
            <div className={"popup" ? "popup-window show" : "popup-window"}>
              <h3>Edit Student Info</h3>
              <div className="detail-container">
                <div className="field-container">
                  <label >Name:</label>
                  <p>{selectedStudent.name}</p>
                  <button onClick={() => handlechange("name")}>Change</button>
                  {
                    changeValue.name &&
                    <>
                      <input type='text' name='name' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label >Register No:</label>
                  <p>{selectedStudent.regNo}</p>
                  <button onClick={() => handlechange("regno")}>Change</button>
                  {
                    changeValue.regno &&
                    <>
                      <input type="text" name='regno' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Age:</label>
                  <p>{selectedStudent.age}</p>
                  <button onClick={() => handlechange("age")}>Change</button>
                  {
                    changeValue.age &&
                    <>
                      <input type="text" name='age' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Gender:</label>
                  <p>{selectedStudent.gender}</p>
                  <button onClick={() => handlechange("gender")}>Change</button>
                  {
                    changeValue.gender &&
                    <>
                      <input type="text" name='gender' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Department:</label>
                  <p>{selectedStudent.department}</p>
                  <button onClick={() => handlechange("department")}>Change</button>
                  {
                    changeValue.department &&
                    <>
                      <input type="text" name='department' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Year:</label>
                  <p>{selectedStudent.year}</p>
                  <button onClick={() => handlechange("year")}>Change</button>
                  {
                    changeValue.year &&
                    <>
                      <input type="text" name='year' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Father Name:</label>
                  <p>{selectedStudent.fatherName}</p>
                  <button onClick={() => handlechange("fathername")}>Change</button>
                  {
                    changeValue.fathername &&
                    <>
                      <input type="text" name='fathername' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="field-container">
                  <label>Mother Name:</label>
                  <p>{selectedStudent.motherName}</p>
                  <button onClick={() => handlechange("mothername")}>Change</button>
                  {
                    changeValue.mothername &&
                    <>
                      <input type="text" name='mothername' onChange={handleValueChange} />
                      <button type='submit' onClick={handleToast} disabled={!isEntered}>Submit</button>
                    </>
                  }
                </div>
                <div className="dash-btn">
                  <button type='submit' onClick={handleRemove}>Back</button>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
      <div className="dash-btn">
        <button type='submit' onClick={handleNaviagte}>Back to Home</button>
      </div>
    </div>
  )
}

export default Edit