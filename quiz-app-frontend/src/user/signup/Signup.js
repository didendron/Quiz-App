import { Button, Form, Input } from 'antd';
import { Component } from "react";
import './Signup.css';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    
} from '../../common/constants';

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
                                onChange={(event) => this.handleInputChange(event, this.validateName)} /> 
                        </Form.Item>
                        <Form.Item 
                            label="Hasło"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="Hasło pomiędzy 6 a 20 znakami" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-button"
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
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nazwa za długa (Maximum ${NAME_MAX_LENGTH} znaków.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    handleInputChange( event,validationName) {
    
        const inputName = event.target.name;        
        const inputValue = event.target.value;
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationName(inputValue)
            }
        });

    }        
}



export default Signup;