import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  //dispara uma função assim que o componente é exibido em tela
  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });

  },[]);
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:'Tiago',
      url: 'https://github.com/tiagomanto/desafioconceitosreactjs',
      techs: ['Node.js', 'ReactJS']
    })
//copiar todos os repositorios e adiciona no final do array
    setRepositories([ ...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //mantem os repositorios que sao diferentes daquele que foi removido
    setRepositories(repositories.filter(
      repositorio => repositorio.id !== id
    ))
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorio => (
          <li key={repositorio.id}>
            {repositorio.title}

          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
