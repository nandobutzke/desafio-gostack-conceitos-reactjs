import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";


function App() {
  const [ repositories, setRepositories ] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const result = await api.post('repositories', {
      title: 'Repository'
    });

    const repository = result.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const result = api.delete(`repositories/${id}`, []);
    
    const deleted = result.data;

    repositories.splice(deleted, 1);
    
    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => { 
          return <li key={repository.id}>
                    {repository.title}
                    <button onClick={() => handleRemoveRepository(repository.id)}>
                      Remover
                    </button>
                </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
