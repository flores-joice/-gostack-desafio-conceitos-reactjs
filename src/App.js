import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [projects, setProjects] = useState()

  useEffect(() => {
    api.get('projects')
    .then( response => setProjects(response.data))
  })

  async function handleAddRepository() {
    api.post('projects', {
        "title": `Novo projeto ${Date.now()}`,
        "owner": "joice Flores"
      }
    )
  }

  async function handleRemoveRepository(id) {
    api.delete(`projects/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            projects && projects.map(project => (
              <li key={project.id}>
                <p>Projeto: {project.title}</p>
                <p>Autor: {project.owner}</p>

                <button onClick={() => handleRemoveRepository(project.id)}>
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
