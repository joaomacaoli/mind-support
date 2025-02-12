import { useState } from "react";
import "./styles.css"; // Importando o CSS

const mockGroups = [
  { id: 1, name: "Apoio à Ansiedade", category: "Ansiedade", location: "Online" },
  { id: 2, name: "Superando a Depressão", category: "Depressão", location: "São Paulo" },
  { id: 3, name: "Grupo de Apoio LGBTQ+", category: "Inclusão", location: "Online" },
  { id: 4, name: "Controle do Estresse", category: "Estresse", location: "Rio de Janeiro" },
  { id: 5, name: "Resiliência Pós-Trauma", category: "Trauma", location: "Online" },
];

export default function SupportGroups() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filteredGroups = mockGroups.filter(group =>
    (category ? group.category === category : true) &&
    (location ? group.location === location : true)
  );

  return (
    <div className="container">
      <h2>Grupos de Apoio</h2>

      {/* Filtros */}
      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">Todas as Categorias</option>
          <option value="Ansiedade">Ansiedade</option>
          <option value="Depressão">Depressão</option>
          <option value="Inclusão">Inclusão</option>
          <option value="Estresse">Estresse</option>
          <option value="Trauma">Trauma</option>
        </select>

        <select onChange={(e) => setLocation(e.target.value)} value={location}>
          <option value="">Todas as Localizações</option>
          <option value="Online">Online</option>
          <option value="São Paulo">São Paulo</option>
          <option value="Rio de Janeiro">Rio de Janeiro</option>
        </select>
      </div>

      {/* Listagem dos grupos */}
      <ul className="group-list">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <li key={group.id} className="group-item">
              <h3>{group.name}</h3>
              <p>{group.category} - {group.location}</p>
            </li>
          ))
        ) : (
          <p>Nenhum grupo encontrado.</p>
        )}
      </ul>
    </div>
  );
}
