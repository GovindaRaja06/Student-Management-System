import React from 'react'
import { useState, useEffect } from 'react'
// import data from "../DB/Dashboarddata.json"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState("");
    const [student, setStudent] = useState([]);
    useEffect(() => {
        if (!department) {
            setStudent([]);
            return;
        }
        const getStudent = async () => {
            try {
                const response = await fetch(`http://localhost:5032/api/Student?department=${department}`);
                const result = await response.json();
                console.log("Backend Works");
                setStudent(result);
            }
            catch (error) {
                console.error(error);
            }
        };
        getStudent();
    }, [department]);
    // const filteredStudent = data.filter(
    const filteredStudent = student.filter(
        (student) => student.department === department
    );
    const averageMark = filteredStudent.reduce(
        (acc, mark) => {
            acc.english += mark.english;
            acc.tamil += mark.tamil;
            acc.maths += mark.maths;
            acc.science += mark.science;
            acc.social += mark.social;
            return acc;
        },
        {
            english: 0,
            tamil: 0,
            maths: 0,
            science: 0,
            social: 0
        }
    );
    const totalStudent = filteredStudent.length;
    const average = {
        english: totalStudent ? averageMark.english / totalStudent : 0,
        tamil: totalStudent ? averageMark.tamil / totalStudent : 0,
        maths: totalStudent ? averageMark.maths / totalStudent : 0,
        science: totalStudent ? averageMark.science / totalStudent : 0,
        social: totalStudent ? averageMark.social / totalStudent : 0
    };
    const subject = [
        { name: "English", mark: average.english },
        { name: "Tamil", mark: average.tamil },
        { name: "Science", mark: average.science },
        { name: "Social", mark: average.social }
    ];
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div>
            <div className="dashboard-container">
                <div className="top-layer">
                    <div className="dropdown-selction">
                        <p>Select Dept</p>
                        <select value={department}
                            onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="Mechanincal">Mechanical</option>
                        </select>
                    </div>
                    <div className="dept-total">
                        <p>Total Number of Students in the Department</p>
                        <strong>{filteredStudent.length}</strong>
                    </div>
                    <div className="avg-marks">
                        {
                            subject.map((detail) => (
                                <div className="mark-card" key={detail.name}>
                                    <p>{detail.name}</p>
                                    <strong>{detail.mark}</strong>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="second-layer">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>English</th>
                                <th>Tamil</th>
                                <th>Maths</th>
                                <th>Science</th>
                                <th>Social</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredStudent.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.department}</td>
                                        <td>{student.english}</td>
                                        <td>{student.tamil}</td>
                                        <td>{student.maths}</td>
                                        <td>{student.science}</td>
                                        <td>{student.social}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan="3"><strong>Average</strong></td>
                                <td>{average.english.toFixed(1)}</td>
                                <td>{average.tamil.toFixed(1)}</td>
                                <td>{average.maths.toFixed(1)}</td>
                                <td>{average.science.toFixed(1)}</td>
                                <td>{average.social.toFixed(1)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="dash-btn">
                    <button type='submit' onClick={handleNavigate}>Back to Home</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard