import { Component } from "react";

class Quiz extends Component{

    componentDidMount() {
        console.log(JSON.stringify(this.props.location.quiz));
    }

    render(){
        return(
            <div>

            </div>
        );
    }
}

export default Quiz;