import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: `Teste na API ${repositories.length + 1}`,
      url: 'http://urldeteste.com.br',
      techs: "vuejs,  react js"
    });
    console.log(repository.data)

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    const repositoryId = repositories.findIndex(rep => rep.id === id);
    console.log(repositoryId);

    await api.delete(`/repositories/${id}`);

    const reps = repositories.filter(rep => {
      return rep.id !== id;
    })
    setRepositories(reps)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repsitory => <li key={repsitory.id}>{repsitory.title}<button onClick={() => handleRemoveRepository(repsitory.id)}>
            Remover
          </button></li>)
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
