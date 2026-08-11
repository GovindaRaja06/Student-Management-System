import React from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Addstd = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  }
  const [student, setStudent] = useState({
    name: "",
    regno: "",
    dob: "",
    govtId: "",
    mark10: "",
    mark12: "",
    govtIdNumber: "",
    year: "",
    fathername: "",
    mothername: "",
    department: "",
    gender: ""
  });
  const handleBlur = () => {
    if (!selectedProof) return;
    if (!selectedProof.pattern.test(student.govtIdNumber)) {
      toast.error(selectedProof.error)
    }
  }
  const handleSubmit = async () => {
    if (student.name === "") {  
      toast.error("Name can't be Empty!!");
      console.log("clicked");
      return;
    }
    if (student.regno === "") {
      toast.error("Register Number is Required!!");
      console.log("clicked");
      return;
    }
    if (student.dob === "") {
      toast.error("DOB is Mandatory");
      console.log("clicked");
      return;
    }
    if (student.govtIdNumber === "") {
      toast.error("Id proof is required!!");
      console.log("clicked");
      return;
    }
    if (student.mark10 === "" || student.mark12 === "") {
      toast.error("Academic Details are Mandatory!!");
      console.log("clicked");
      return;
    }
    if (student.year === "") {
      toast.error("Academic Year is Mandatory!!");
      return;
    }
    if (student.fathername === "") {
      toast.error("Parent name is Mandatory!!");
      return;
    }
    if (student.mothername === "") {
      toast.error("Mothername is Mandatory!!");
      return;
    }
    if (student.department === "") {
      toast.error("Department is Mandatory!!");
      return;
    }
    if (student.gender === "") {
      toast.error("Gender is Required");
      return;
    }
    const studentData = {
      name: student.name,
      regNo: student.regno,
      dateOfBirth: student.dob,
      idType: student.govtId,
      govtId: student.govtIdNumber,
      mark10: Number(student.mark10),
      mark12: Number(student.mark12),
      year: Number(student.year),
      department :student.department,
      fathername :student.fathername,
      mothername: student.mothername,
      gender:student.gender
    };
    try {
      const response = await fetch("http://localhost:5032/api/Student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify(studentData)
        }
      );
      if (!response.ok) {
        throw new Error("Can't post Student Data");
      }
      const result = await response.json();
      console.log(result);
      toast.success("Student data is Successfully Added!!!");
    } catch (error) {
      console.log(error);
      toast.error("Faild to post the student");
    }
  };
  // const [selectId, setSelectId] = useState("");
  // const [idNumber, setIdNumnber] = useState("");
  const idProof = [
    {
      type: "Aadhar",
      maxLenght: 12,
      pattern: /[0-9]{12}$/,
      placeholder: "Enter Aadhar Number",
      error: "Aadhar only contains Numbers"
    },
    {
      type: "PAN",
      maxLenght: 10,
      placeholder: "Enter PAN Number",
      pattern: /[A-Z]{5}[0-9]{4}[A-z]{1}$/,
      error: "PAN Should be AlphaNumberic"
    },
    {
      type: "Driving License",
      maxLenght: 16,
      placeholder: "Enter Driving License Numeber",
      pattern: /[0-9]{12}$/,
      error: "License contains 12 digits"
    }
  ];
  const selectedProof = idProof.find(
    (proof) => proof.type === student.govtId
  );
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
      <div className="addstd-container">
        <div className="top-heading">
          <h2>Add Student</h2>
        </div>
        <div className="student-detail">
          <p className='heading1'>
            Enter student Details
          </p> <br />
          <div className="form-row">
            <label><strong>Name:</strong></label>
            <input type="text" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} /> <br />
          </div>
          <div className="form-row">
            <label><strong>Register No:</strong></label>
            <input type="text" value={student.regno} onChange={(e) => setStudent({
              ...student,
              regno: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label ><strong>Date of Birth:</strong></label>
            <input type="date" value={student.dob} onChange={(e) => setStudent({
              ...student,
              dob: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label ><strong>Govt Id Proof</strong></label>
            <div className="govtIdsec">
              {/* <select value={selectId} onChange={(e) => { setSelectId(e.target.value); setIdNumnber("") }}> */}
              <select value={student.govtId} onChange={(e) => {
                setStudent({
                  ...student,
                  govtId: e.target.value,
                  govtIdNumber: ""
                })
              }}>
                <option value="">Select an Govt ID</option>
                {
                  idProof.map((proof) => (
                    <option key={proof.type} value={proof.type}>{proof.type}</option>
                  ))
                }
              </select>
              {student.govtId &&
                // <input type="text" value={idNumber} onChange={(e) => setIdNumnber(e.target.value)}
                <input type="text" value={student.govtIdNumber} onChange={(e) => setStudent({
                  ...student,
                  govtIdNumber: e.target.value
                })}
                  onBlur={handleBlur}
                  placeholder={selectedProof ? selectedProof.placeholder : "select an Id proof"}
                  maxLength={selectedProof ? selectedProof.maxLenght : 0}
                />
              }
              <br />
            </div>
          </div>
          <div className="form-row">
            <label>Current Year</label>
            <input type="text" value={student.year} onChange={(e) => setStudent({
              ...student,
              year: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>Father's Name</label>
            <input type="text" value={student.fathername} onChange={(e) => setStudent({
              ...student,
              fathername: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>Mother's Name</label>
            <input type="text" value={student.mothername} onChange={(e) => setStudent({
              ...student,
              mothername: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>Department</label>
            <input type="text" value={student.department} onChange={(e) => setStudent({
              ...student,
              department: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>Gender</label>
            <input type="text" value={student.gender} onChange={(e) => setStudent({
              ...student,
              gender: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>10th Grade Mark</label>
            <input type="text" value={student.mark10} onChange={(e) => setStudent({
              ...student,
              mark10: e.target.value
            })} /> <br />
          </div>
          <div className="form-row">
            <label>12th Grade Mark</label>
            <input type="text" value={student.mark12} onChange={(e) => setStudent({
              ...student,
              mark12: e.target.value
            })} /> <br />
          </div>
          <button type='submit' onClick={handleSubmit} >Submit</button>
          <button type='submit' onClick={handleNavigate}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default Addstd