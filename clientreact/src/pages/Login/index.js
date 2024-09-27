import React, {useState} from 'react';
import './styles.css';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';


import logoImage from '../../assets/login.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function login(event){
        event.preventDefault();

        const data = {
            email, password
        };

        try{

            const response = await api.post('api/account/loginuser',data);

            localStorage.setItem('email',email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            history.push('/alunos');
        }catch(error){
            alert('O login falhou ' + error)
        }      
    }

    return (
        <div className="login-container">
          <section className="form">
            <img src={logoImage} alt="Login" id="img1" />
            <form onSubmit={login}>
                <h1>Cadastro de Alunos</h1>
                    
                <input placeholder="Email" 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                />
                <button class="button" type="submit">Login</button>
            </form>
            </section>
        </div>
    )
}