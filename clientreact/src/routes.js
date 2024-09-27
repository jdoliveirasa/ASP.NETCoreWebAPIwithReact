import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Alunos from './pages/Alunos';
import NovoAluno from './pages/NovoAluno'

export default function Routes(){
    return (
        <BrowserRouter>
           <Switch>
               <Route path="/" exact component={Login}/>
               <Route path="/alunos" component={Alunos}/>
               <Route path="/aluno/novo/:alunoId" component={NovoAluno}/>
            </Switch>
        </BrowserRouter>    
    );
}