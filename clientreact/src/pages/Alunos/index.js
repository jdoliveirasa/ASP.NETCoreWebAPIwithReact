import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';


import logoCadastro from '../../assets/cadastro1.png';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Alunos() {

     //filtrar dados
     const [searchInput,setSearchInput]  = useState('');
     const [filtro, setFiltro] = useState([]);

     const [alunos, setAlunos] = useState([]);

     const email = localStorage.getItem('email');
     const token = localStorage.getItem('token');

     const history = useHistory();
   
     const authorization = {
         headers : {
           Authorization : `Bearer ${token}`
         }
     }

     const searchAlunos = (searchValue) => {
      setSearchInput(searchValue);
      if (searchInput !== '') {
          const dadosFiltrados = alunos.filter((item) => {
              return Object.values(item).join('').toLowerCase()
              .includes(searchInput.toLowerCase())
          });
          setFiltro(dadosFiltrados);
      }
      else{
          setFiltro(alunos);
      }
    }

     useEffect( ()=> {
       api.get('api/alunos',authorization).then(
         response=> {setAlunos(response.data);
        }, token)
     })

     async function logout(){
       try{
          localStorage.clear();
          localStorage.setItem('token','');
          authorization.headers ='';
          history.push('/'); 
       }catch(err){
        alert('Não foi possível fazer o logout' + err);
       }
     }

     async function editAluno(id){
       try{
         history.push(`aluno/novo/${id}`);
       }catch(error){
        alert('Não foi possível editar o aluno')
       }
     }

     async function deleteAluno(id){
       try{
          if(window.confirm('Deseja deletar o aluno de id = ' + id + ' ?'))
          {
                await api.delete(`api/alunos/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
          }
       }catch(error){
        alert('Não foi possível excluir o aluno')
       }
     }


    return (
        <div className="aluno-container">
            <header>
               <img src={logoCadastro} alt="Cadastro" />
               <span>Bem-Vindo, <strong>{email}</strong>!</span>
               <Link className="button" to="aluno/novo/0">Novo Aluno</Link>

               <button onClick={logout} type="button">
                   <FiXCircle size={35}  color="#17202a" />
               </button>
            </header>

            <form>
              <input type='text'
               placeholder='Filtrar por nome...'
                onChange={(e) => searchAlunos(e.target.value)} 
              />
            </form>

            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
               <ul> 
               {filtro.map(aluno => (
                    <li key={aluno.Id}>
                        <b>Nome:</b>{aluno.nome}<br/><br/>
                        <b>Email:</b>{aluno.email}<br/><br/>
                        <b>Idade:</b>{aluno.idade}<br/><br/>
                        <button onClick={()=> editAluno(aluno.id)} type="button">
                            <FiEdit size="25" color="#17202a" />
                        </button>
                        <button type="button" onClick= {()=> deleteAluno(aluno.id)}> 
                            <FiUserX size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
              </ul>
              ) : (
            <ul>
               {alunos.map(aluno=>(
                 <li key={aluno.id}>
                  <b>Nome:</b>{aluno.nome}<br/><br/>
                  <b>Email:</b>{aluno.email}<br/><br/>
                  <b>Idade:</b>{aluno.idade}<br/><br/>

                 <button onClick={()=> editAluno(aluno.id)} type="button">
                     <FiEdit size="25" color="#17202a" />
                 </button>

                 <button type="button" onClick= {()=> deleteAluno(aluno.id)}> 
                         <FiUserX size="25" color="#17202a" />
                   </button>
               </li>
                ))}
            </ul>
           )}
        </div>
     );
}