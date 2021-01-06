import React from "react";
import StudentBackground from "./StudentBackground";

class Voting extends React.Component{
    render() {
        return (
            <StudentBackground content={<h1>Voting</h1>}/>
        );
    }
}

export default Voting;