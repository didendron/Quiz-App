import { Button, Form, Input, notification } from 'antd';
import { Component } from "react";
import './Signup.css';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    PASSWORD_MIN_LENGTH,PASSWORD_MAX_LENGTH
    
} from '../../common/constants';

import  {signup, validatNameAvailability,validatePasswordAvailability}  from '../../api/Api';

import { Link } from 'react-router-dom';


class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            name:{
               value: ''
            },
            password:{
                value:''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkNameAvailability=this.checkNameAvailability.bind(this);
        this.checkPasswordAvailability=this.checkPasswordAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    

    render(){
        return(
            
            <div className="signup-container">
                <h1 className="signup-title">Rejestracja</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <Form.Item 
                            label="Nazwa użytkownika"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                             <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Twoja nazwa użytkownika"
                                value={this.state.name.value}
                                onBlur={this.checkNameAvailability} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} /> 
                        </Form.Item>
                        <Form.Item 
                            label="Hasło"
                            validateStatus={this.state.password.validateStatus}
                            help={<label style={{paddingLeft:'85px'}}>{this.state.password.errorMsg}</label>}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="Hasło pomiędzy 6 a 20 znakami" 
                                value={this.state.password.value}
                                onBlur={this.checkPasswordAvailability} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-button"
                                disabled={this.isFormInvalid()}
                                onClick={this.handleSubmit}
                                >Zarejestruj się</Button>
                                Jesteś zarejestrowany? <Link to="/login">Zaloguj się!</Link>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        );
    }

    validateName=(name)=>{
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa za krótka (Minimum ${NAME_MIN_LENGTH} znaków.)`
            };
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nazwa za długa (Maximum ${NAME_MAX_LENGTH} znaków.)`
            };
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    validatePassword=(password)=>{
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Hasło za krótkie (Minimum ${PASSWORD_MIN_LENGTH} znaków.)`
            };
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Hasło za długie (Maximum ${PASSWORD_MAX_LENGTH} znaków.)`
            };
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    handleInputChange( event,validationInput) {
    
        const inputName = event.target.name;        
        const inputValue = event.target.value;
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationInput(inputValue)
            }
        });

    }    

    checkNameAvailability(){
        const nameValue=this.state.name.value;
        

        if(this.validateName(nameValue).validateStatus==='error'){
            this.setState({
                name:{
                    value:nameValue,
                    ...this.validateName(nameValue)
                }
            })
            return;
        }
        

        validatNameAvailability(nameValue)
        .then(response=>{
            console.log(response.isAvailable);
            if(response.isAvailable){
                this.setState({
                    name:{
                        value:nameValue,
                        validateStatus:'success',
                        errorMsg:null
                    }
                })
            }else{
                this.setState({
                    name:{
                        value:nameValue,
                        validateStatus:'error',
                        errorMsg:'Nazwa użytkownika już istnieje'
                    }
                })
            }
            
        }).catch(response=>{
            this.setState({
                name:{
                    value:nameValue,
                    validateStatus:'success',
                    errorMsg:null
                }
            })
        })


    }

    checkPasswordAvailability(){
        const passwordValue=this.state.password.value;

        if(this.validatePassword(passwordValue).validateStatus==='error'){
            this.setState({
                password:{
                    value:passwordValue,
                    ...this.validatePassword(passwordValue)
                }
            })
            return;
        }

        validatePasswordAvailability(passwordValue)
        .then(response=>{
            if(response.isAvailable){
                this.setState({
                    password:{
                        value:passwordValue,
                        validateStatus:'success',
                        errorMsg:null
                    }
                })
            }else{
                this.setState({
                    password:{
                        value:passwordValue,
                        validateStatus:'error',
                        errorMsg:'Hasło już istnieje'
                    }
                })
            }
            
        }).catch(response=>{
            this.setState({
                password:{
                    value:passwordValue,
                    validateStatus:'success',
                    errorMsg:null
                }
            })
        })

        
    }




    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }
    
    handleSubmit(event) {
        
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            password: this.state.password.value
        };
        
        signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'Quiz App',
                description: 'Rejestracja przebiegła pomyślnie.Zaloguj się',
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'Quiz App',
                description: error.message || 'Błąd!Spróbuj ponownie'
            });
        });
    }
    
}



export default Signup;