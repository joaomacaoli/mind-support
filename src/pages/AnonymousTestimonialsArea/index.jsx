import { useState } from "react";
import { CircleUserRound, Trash, Edit } from "lucide-react";
import "./styles.css";

const Testimonials = () => {
  const [depoimento, setDepoimento] = useState("");
  const [listaDepoimentos, setListaDepoimentos] = useState([
    {
      text: "Sinto que finalmente encontrei um lugar onde posso ser ouvido.",
      isMocked: true,
    },
    {
      text: "A plataforma me ajudou a encontrar o apoio que tanto precisava.",
      isMocked: true,
    },
    {
      text: "É muito bom saber que há profissionais dispostos a ajudar com preços acessíveis.",
      isMocked: true,
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDepoimento, setNewDepoimento] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (depoimento.trim()) {
      setListaDepoimentos([
        { text: depoimento, isMocked: false },
        ...listaDepoimentos,
      ]);
      setDepoimento("");
      setIsSubmitted(false);
    }
  };

  const handleDelete = (index) => {
    if (!listaDepoimentos[index].isMocked) {
      const updatedList = listaDepoimentos.filter((_, i) => i !== index);
      setListaDepoimentos(updatedList);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewDepoimento(listaDepoimentos[index].text);
  };

  const handleSaveEdit = (index) => {
    if (newDepoimento.trim()) {
      const updatedList = [...listaDepoimentos];
      updatedList[index].text = newDepoimento;
      setListaDepoimentos(updatedList);
      setEditingIndex(null); 
      setNewDepoimento("");
    }
  };

  return (
    <div className="all-container" id="all-container">
      <div className="testimonials-container">
        <div className="header-testimonials">
          <h2>Área de Depoimentos Anônimos</h2>
        </div>

        <div className="container-form-testimonials">
          <form onSubmit={handleSubmit} className="testimonials-form">
            <input
              type="text"
              value={depoimento}
              onChange={(e) => setDepoimento(e.target.value)}
              placeholder="Escreva seu depoimento aqui..."
              className={`testimonials-input ${
                isSubmitted && depoimento.trim() === "" ? "invalid" : ""
              }`}
            />
            <p className="testimonials-instructions">
              Ex.: &quot;Melhor experiência que já tive, mudou minha
              rotina!&quot;
            </p>
            <br />
            <button type="submit" className="testimonials-btn">
              Enviar Depoimento
            </button>
          </form>
        </div>

        <div className="testimonials-show">
          <div className="testimonials-text">
            <h2 className="testimonials-title">Depoimentos</h2>
            <p className="testimonials-description">
              Veja o que outras pessoas estão falando sobre a plataforma:
            </p>
          </div>

          <div className="testimonials-list">
            {listaDepoimentos.length > 0 ? (
                
              <ul className="testimonials-ul">
                {listaDepoimentos.map((item, index) => (
                  <li key={index} className="testimonials-li">
                    <div className="testimonials-header">
                      <CircleUserRound size={24} />
                      <div className="testimonials-name">Usuário Anônimo</div>
                      {!item.isMocked && (
                        <>
                          <Edit
                            size={20}
                            className="edit-icon"
                            onClick={() => handleEdit(index)}
                          />
                          <Trash
                            size={20}
                            className="trash-icon"
                            onClick={() => handleDelete(index)}
                          />
                        </>
                      )}
                    </div>
                    {editingIndex === index ? (
                      <div className="edit-input">
                        <input
                          type="text"
                          value={newDepoimento}
                          onChange={(e) => setNewDepoimento(e.target.value)}
                          className={`testimonials-input-edit ${
                            newDepoimento.trim() === "" ? "invalid" : ""
                          }`}
                          placeholder="Escreva seu depoimento aqui..."
                        />
                        <button
                          type="button"
                          className="save-btn"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <p>{item.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há depoimentos para exibir ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
