import React from 'react'
import card from "../DB/Home.json"
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const handleClick = (dest) => {
        console.log(dest);
        navigate(dest)
    };
    return (
        <div>
            <div className="home-top">
                <h2>Welcome to the University Portal</h2>
            </div>
            <div className="home-container">
                {
                    (card.map((data) =>
                        <div className="wrapper" key={data.id}>
                            <p>{data.title}</p>
                            <button onClick={() => handleClick(data.path)}><strong>{data.description}</strong></button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home