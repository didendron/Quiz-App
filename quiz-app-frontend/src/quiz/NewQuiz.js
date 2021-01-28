
import { Button, Divider, Form, Input, Radio, Select } from "antd";
import  {CloseOutlined, PlusOutlined } from '@ant-design/icons';

import TextArea from "antd/lib/input/TextArea";

import { Component } from "react";
import { QUIZ_CHOICE_MAX_LENGTH, QUIZ_MAX_CHOICES, QUIZ_NAME_MAX_LENGTH, QUIZ_QUESTION_MAX_LENGTH } from "../common/constants";
import './NewQuiz.css';  



class NewQuiz extends Component{
    constructor(props){
        super(props);
        this.state={
            quiz:{
                text:''
            },
            category:{
                text:''
            },
            questions:[{
                question:{
                    text:''
                },
                choices: [{
                    text: ''
                }, {
                    text: ''
                },
                {
                    text: ''
                },
                {
                    text: ''
                }],
                correctChoice:{
                    text:''
                }
            }]
            
           

        }

    this.handleQuizChange=this.handleQuizChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleCategoryChange=this.handleCategoryChange.bind(this);
    this.addChoice=this.addChoice.bind(this);
    this.removeQuestion=this.removeQuestion.bind(this);
    this.handleQuestionChange=this.handleQuestionChange.bind(this);
    this.handleChoiceChange=this.handleChoiceChange.bind(this);
    this.handleRadioChange=this.handleRadioChange.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);


    }

    addChoice(event){
        const questions = this.state.questions.slice();
        this.setState({
            questions:questions.concat([{
                question:{
                    text:''
                },
                choices: [{
                    text: ''
                }, {
                    text: ''
                },
                {
                    text: ''
                },
                {
                    text: ''
                }],
                correctChoice:{
                    text:''
                }
            }])
        }); 
    }
    removeQuestion(questionNumber){
        const questions = this.state.questions.slice();
        this.setState({
            questions:[...questions.slice(0,questionNumber),...questions.slice(questionNumber+1)]
        });
    }

    handleQuizChange(event){
        const value=event.target.value;
        this.setState({
            quiz:{
                text:value,
                ...this.validateQuizName(value)
            }
        })

    }

    validateQuizName=(value)=>{
        if(value.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Wpisz nazwę quizu!'
            }
        } else if (value.length > QUIZ_NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa quizu za długa (Maksymalnie ${QUIZ_NAME_MAX_LENGTH} znaków dozwolone)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleCategoryChange(value){
        this.setState({
            category:{
                text:value
            }
        });
    }

    handleQuestionChange(event,index){
        const value = event.target.value;


        this.setState((state)=>{
            let newState=JSON.parse(JSON.stringify(state));
            newState.questions[index].question.text=value;
            newState.questions[index].question.validateStatus=this.validateQuestion(value).validateStatus;
            newState.questions[index].question.errorMsg=this.validateQuestion(value).errorMsg;

            return({
                questions:newState.questions
            });

        }   
        );

    }
    validateQuestion=(value)=>{
        if(value.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Wpisz pytanie!'
            }
        } else if (value.length > QUIZ_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Pytanie za długie (Maksymalnie ${QUIZ_QUESTION_MAX_LENGTH} znaków dozwolone)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleChoiceChange(event,index,indexQuestion){
        
        
        const value = event.target.value;


        this.setState((state)=>{
            let newState=JSON.parse(JSON.stringify(state));
            newState.questions[indexQuestion].choices[index].text=value;
            newState.questions[indexQuestion].choices[index].validateStatus=this.validateChoice(value).validateStatus;
            newState.questions[indexQuestion].choices[index].errorMsg=this.validateChoice(value).errorMsg;

            return({
                questions:newState.questions
            });

        }   
        );
    }

  
  
  

    validateChoice=(value)=>{
        if(value.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Wpisz odpowiedź!'
            }
        } else if (value.length > QUIZ_CHOICE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Odpowiedź (Maksymalnie ${QUIZ_CHOICE_MAX_LENGTH} znaków dozwolone)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleRadioChange(event,index){
        const value = event.target.value;
        
        const val=this.state.questions[index].choices[value-1].text;
        console.log(val);

        this.setState((state)=>{
            let newState=JSON.parse(JSON.stringify(state));
            newState.questions[index].correctChoice.text=val;

            return({
                questions:newState.questions
            });

        }   
        );
    }

    isFormInvalid(){
        if(this.state.quiz.validateStatus !== 'success') {
            return true;
        }
        
    
        for(let i = 0; i < this.state.questions.length; i++) {
            const question = this.state.questions[i].question;            
            if(question.validateStatus !== 'success') {
                return true;
            }
        }
        for(let i = 0; i < this.state.questions.length; i++) {
            const choices = this.state.questions[i].choices; 
            for(let i=0;i<choices.length;i++) {
                if(choices[i].validateStatus !== 'success') {
                return true;
            }
            }          
            
        }
    } 


    handleSubmit(event){

    }



    render(){
        const questionViews=[];
        this.state.questions.forEach((question,index)=>{
            questionViews.push(<QuizQuestion  key={index} question={question} questionNumber={index}
             removeQuestion={this.removeQuestion} handleQuestionChange={this.handleQuestionChange}
            handleChoiceChange={this.handleChoiceChange} handleRadioChange={this.handleRadioChange} />);
        });

        return(
            <div className="new-quiz-container">
                <h1 className="title">Nowy Quiz</h1>
                <div className="new-quiz-content">
                    <Form onFinish={this.handleSubmit} className="new-quiz-form">
                        <Form.Item validateStatus={this.state.quiz.validateStatus}
                        help={this.state.quiz.errorMsg} className="form-row">
                            <TextArea
                            placeholder="Wprowadź nazwę quizu"
                            style = {{ fontSize: '16px' }} 
                            autosize={{ minRows: 3, maxRows: 6 }} 
                            name = "quiz"
                            value = {this.state.quiz.text}
                            onChange = {this.handleQuizChange}/>
                        </Form.Item>
                        <Form.Item className="form-row">
                            
                            Kategoria:<Select name="categories"
                            defaultValue="geografia"
                            value={this.state.category.text}
                            onChange={this.handleCategoryChange}
                            style={{width:150}}>
                                <Select.Option value="geografia">geografia</Select.Option>
                                <Select.Option value="język">język</Select.Option>
                                <Select.Option value="historia">historia</Select.Option>
                                <Select.Option value="przyroda">przyroda</Select.Option>
                                <Select.Option value="filmy">filmy</Select.Option>
                                <Select.Option value="książki">książki</Select.Option>
                                <Select.Option value="wiedza ogólna">wiedza ogólna</Select.Option>
                                <Select.Option value="matematyka">matematyka</Select.Option>
                            </Select>
                        </Form.Item>    
                        <Divider className="line"/>
                        {questionViews}

                        <Form.Item className="form-row">
                            <Button type="dashed" onClick={this.addChoice} disabled={this.state.questions.length === QUIZ_MAX_CHOICES}>
                                <PlusOutlined /> Dodaj pytanie
                            </Button>
                        </Form.Item>

                        
                        <Form.Item className="form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-quiz-button">Utwórz quiz</Button>
                        </Form.Item>
                       


                    </Form>
                </div>
            </div>
        );
    }

}

function QuizQuestion(props){
    const choiceViews=[];
    props.question.choices.forEach((choice,index)=>{
        choiceViews.push(<QuizChoice  key={index} choice={choice} choiceNumber={index}
        questionNumber={props.questionNumber}
         handleChoiceChange={props.handleChoiceChange} />);
    });
   
    return(
        <Form.Item validateStatus={props.question.question.validateStatus}
        help={props.question.question.errorMsg} className="form-row">
            <TextArea
                placeholder={'Pytanie ' + (props.questionNumber + 1)}
                style = {{ fontSize: '16px' }} 
                autosize={{ minRows: 2, maxRows: 4 }} 
                name = "question"
                value = {props.question.question.text} 
                onChange={(event)=>props.handleQuestionChange(event,props.questionNumber)}/>
            

            {
                props.questionNumber > 0 ? (
                <CloseOutlined
                    className="dynamic-delete-button"
                    disabled={props.questionNumber < 1}
                    onClick={() => props.removeQuestion(props.questionNumber)}
                /> ): null
            } 
            
            {choiceViews}
            <Form.Item  className="form-row">
                Właściwa odpowiedź:<Radio.Group onChange={(event)=>props.handleRadioChange(event,props.questionNumber)} 
                defaultValue={1}>
                    <Radio value={1}>Odp.1</Radio>
                    <Radio value={2}>Odp.2</Radio>
                    <Radio value={3}>Odp.3</Radio>
                    <Radio value={4}>Odp.4</Radio>
                </Radio.Group>

            </Form.Item>
      
    
        </Form.Item>  
        

    );
}

function QuizChoice(props){

    

    return(
        <Form.Item validateStatus={props.choice.validateStatus}
        help={props.choice.errorMsg} className="form-row">
            <Input 
                placeholder = {'Odpowiedź ' + (props.choiceNumber + 1)} 
                size="large"
                value={props.choice.text} 
                onChange={(event) => props.handleChoiceChange(event, props.choiceNumber,props.questionNumber)} />


        </Form.Item>

    );

}




export default NewQuiz;