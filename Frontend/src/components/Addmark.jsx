import React from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
const Addmark = () => {
    const [regno, setRegNo] = useState("");
    // const [student, setStudent] = useState(null);
    const [mark, setMark] = useState({
        english: "",
        tamil: "",
        maths: "",
        science: "",
        social: ""
    });
    const handleSearch = async () => {
        if (regno === "") {
            toast.error("Register number can't be empty!!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5032/api/Student/${regno}`);
            if (!response.ok) {
                throw new Error("Student cant be Fetched");
            }
            toast.success("Student Founded!!");
            const result = await response.json();
            // setStudent(result);
            console.log(result);
        } catch (error) {
            console.log(error);
            toast.error("Unable to find the student");
        }
    }
    const handleSubmit = async () => {
        if (mark.english === "") {
            toast.error("English Subject is required");
            return;
        }
        if (mark.tamil === "") {
            toast.error("Tamil Subject is Required");
            return;
        }
        if (mark.science === "") {
            toast.error("Science Subject Mark is Required");
            return;
        }
        if (mark.maths === "") {
            toast.error("Maths Subject mark is required");
            return;
        }
        if (mark.social === "") {
            toast.error("Social subject mark is required");
            return;
        }
        const studentData = {
            English: Number(mark.english),
            Tamil: Number(mark.tamil),
            Maths: Number(mark.maths),
            Science: Number(mark.science),
            Social: Number(mark.social)
        }
        try {
            const response = await fetch(`http://localhost:5032/api/Student/${regno}/marks`, {
                method: "PUT",
                headers:
                {
                    "Content-type": "application/json"
                }, body: JSON.stringify(studentData)
            })
            if(!response.ok){
                throw new Error("Unable to post the datas");
            }
            const result = await response.json();
            console.log(result);
            toast.success("Student Marks Updated");
        } catch (error) {
            console.log(error);
            toast.error("Can't able to update Student Marks");
        }

    }
    return (
        <div>
            <>
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    pauseOnHover={true}
                    theme='light'
                    transition={Bounce}
                />
            </>
            <div className="addmark-container">
                <div className="student-detail">
                    <input type="text" placeholder='Search Student Register Number' value={regno} onChange={(e) => setRegNo(e.target.value)} />
                    <button type='submit' onClick={handleSearch}>Search</button>
                    <p>Enter  Student's Mark Details</p> <br />
                    <div className="form-row">
                        <label>English</label>
                        <input type="text" value={mark.english} onChange={(e) => setMark({ ...mark, english: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <label>Tamil</label>
                        <input type="text" value={mark.tamil} onChange={(e) => setMark({ ...mark, tamil: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <label>Maths</label>
                        <input type="text" value={mark.maths} onChange={(e) => setMark({ ...mark, maths: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <label>Science</label>
                        <input type="text" value={mark.science} onChange={(e) => setMark({ ...mark, science: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <label>Social</label>
                        <input type="text" value={mark.social} onChange={(e) => setMark({ ...mark, social: e.target.value })} />
                    </div>
                </div>
                <div className="mark-btn">
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Addmark