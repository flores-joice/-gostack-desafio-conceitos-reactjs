import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setrepositories] = useState()

  useEffect(() => {
    api.get('repositories')
    .then( response => setrepositories(response.data))
  })

  async function handleAddRepository() {
    api.post('repositories', {
        "title": `Novo projeto ${Date.now()}`,
        "owner": "joice Flores"
      }
    )
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            repositories && repositories.map(repository => (
              <li key={repository.id}>
                <p>Projeto: {repository.title}</p>
                <p>Autor: {repository.owner}</p>

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
