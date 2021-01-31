import { notification } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { getQuizzes } from "../api/Api";
import './QuizList.css'

var randomColor = require('randomcolor');

class QuizList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
        this.loadQuizList=this.loadQuizList.bind(this);
       
    }

    loadQuizList(){
        getQuizzes()
        .then(response=>{
            const quizzes=this.state.quizzes.slice();
            this.setState({
                quizzes:quizzes.concat(response.quizData)

            });
        }).catch(error=>{
            notification.error({
                message: 'Quiz App',
                description: error.message || 'Błąd!'
            });     
        }

        );

    }

    componentDidMount() {
        this.loadQuizList();
    }

    
    
    render(){
        const quizViews=[];
        this.state.quizzes.forEach((quiz,quizIndex)=>{
            quizViews.push(<QuizView key={quizIndex} quiz={quiz} />);
        });

        return(
            <div className="quiz-container">
                {quizViews}

            </div>

        );
    }

}

function QuizView(props){
    return(
        <Link to={{pathname:"/quiz", quiz:props.quiz}}   >
            <div className="quiz-view">
                <Avatar className="avatar" 
                    style={{ backgroundColor: randomColor()}} >
                    <span className="avatar-title">Quiz</span>
                </Avatar>
                <h1 className="title">
                    Tytuł quizu:{props.quiz.quiz}
                </h1>
                <h3 className="category">
                    Kategoria:{props.quiz.category}

                </h3>
            </div>    
        </Link>
    );
}

export default withRouter(QuizList);