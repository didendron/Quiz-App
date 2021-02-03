import { Button } from "antd";
import { Component } from "react";
import ReactDOM from 'react-dom';

import './Quiz.css'

class Quiz extends Component{

    constructor(props) {
        super(props);
        this.state = {
            quiz:this.props.location.quiz,
            bgColor:[],
            totalVotes:0,
            correctVotes:0
        };

        this.handleClick=this.handleClick.bind(this);
        
       
    }
    handleClick(event,questionNumber,choiceNumber){
        event.preventDefault();
        const bgColor=this.state.bgColor.slice();
        

        if(bgColor[questionNumber*4+0]==='chartreuse'||bgColor[questionNumber*4+1]==='chartreuse'||
        bgColor[questionNumber*4+2]==='chartreuse'||bgColor[questionNumber*4+3]==='chartreuse')return;

        const totalVotes=this.state.totalVotes+1;
        this.setState({
            totalVotes:totalVotes
        },this.countVotes);

        if(this.state.quiz.questions[questionNumber].choices[choiceNumber].text===this.state.quiz.questions[questionNumber].correctChoice.text){
            const correctVotes=this.state.correctVotes+1;
            this.setState({
                correctVotes:correctVotes
            });

            bgColor[questionNumber*4+choiceNumber]='chartreuse';
            this.setState({
                bgColor:bgColor
            });
            

            const element = <h3 style={{color:'chartreuse'}}>Dobrze!</h3>;
            ReactDOM.render(element, document.getElementById('answer'+questionNumber));


            
        }else{
            bgColor[questionNumber*4+choiceNumber]='red';
            var indexOfCorrectChoice;
            indexOfCorrectChoice=this.state.quiz.questions[questionNumber].choices.findIndex(obj=>obj.text===this.state.quiz.questions[questionNumber].correctChoice.text)
            bgColor[questionNumber*4+indexOfCorrectChoice]='chartreuse';
            this.setState({
                bgColor:bgColor
            });

            const element = <h3 style={{color:'red'}}>Źle!</h3>;
            ReactDOM.render(element, document.getElementById('answer'+questionNumber));
        }
        

        
    }

    countVotes=()=>{
        if(this.state.totalVotes===this.state.quiz.questions.length){
            const element = <h1 style={{color:'green',fontSize:'24px'}}>Liczba poprawnych odpowiedzi: {this.state.correctVotes} z {this.state.totalVotes}</h1>;
            ReactDOM.render(element, document.getElementById('end'));
            document.getElementById('end').scrollIntoView();
        }
    }


    render(){
        const quizView=[];
        this.state.quiz.questions.forEach((question,questionIndex)=>{
            quizView.push(<QuestionView key={questionIndex} question={question} bgColor={this.state.bgColor}
                questionNumber={questionIndex} handleClick={this.handleClick} />);
        });

        return(
            <div className="quiz-container">
                <div className="quiz-title">
                    <h1 >
                        {this.state.quiz.quiz}
                    </h1>
                    <h3 >
                        Kategoria:{this.state.quiz.category}
                    </h3>
                </div>    
                    {quizView}
                <div id="end"></div>
                
            </div>
        );
    }
}

function QuestionView(props){
    return(
        <div className="question-container">
            <h3>
                {props.questionNumber+1}.{props.question.question.text}
            </h3>
            <div>
                <Button type="default"  size="large" style={{backgroundColor:props.bgColor[props.questionNumber*4+0]}}
                    onClick={(event)=>props.handleClick(event,props.questionNumber,0)} 
                    className="first-choice-button">{props.question.choices[0].text}</Button>
            </div>
            <div>
                <Button type="default"  size="large" style={{backgroundColor:props.bgColor[props.questionNumber*4+1]}}
                    onClick={(event)=>props.handleClick(event,props.questionNumber,1)} 
                    className="second-choice-button">{props.question.choices[1].text}</Button>
            </div>
            <div>
                <Button type="default"  size="large" style={{backgroundColor:props.bgColor[props.questionNumber*4+2]}}
                    onClick={(event)=>props.handleClick(event,props.questionNumber,2)} 
                    className="third-choice-button">{props.question.choices[2].text}</Button>
            </div>
            <div>
                <Button type="default"  size="large" style={{backgroundColor:props.bgColor[props.questionNumber*4+3]}}
                    onClick={(event)=>props.handleClick(event,props.questionNumber,3)} 
                    className="fourth-choice-button">{props.question.choices[3].text}</Button>
            </div>
            <div id={'answer'+props.questionNumber}></div>
        </div>
    );
}

export default Quiz;