import { useEffect, useState } from "react";
import { CircleUserRound, Trash, Edit } from "lucide-react";
import { getAllTestimonials } from "../../services/testimonials";
import "./styles.css";

export default function TestimonialsPage() {
  const [depoimento, setDepoimento] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDepoimento, setNewDepoimento] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getAllTestimonials();
      setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (depoimento.trim()) {
      setTestimonials([{ text: depoimento, isMocked: false }, ...testimonials]);
      setDepoimento("");
      setIsSubmitted(false);
    }
  };

  const handleDelete = (index) => {
    if (!testimonials[index].isMocked) {
      const updatedList = testimonials.filter((_, i) => i !== index);
      setTestimonials(updatedList);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewDepoimento(testimonials[index].text);
  };

  const handleSaveEdit = (index) => {
    if (newDepoimento.trim()) {
      const updatedList = [...testimonials];
      updatedList[index].text = newDepoimento;
      setTestimonials(updatedList);
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
            {testimonials.length > 0 ? (
              <ul className="testimonials-ul">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.id} className="testimonials-li">
                    <div className="testimonials-header">
                      <CircleUserRound size={24} />
                      <div className="testimonials-name">Usuário Anônimo</div>
                      <>
                        <Edit
                          size={20}
                          className="edit-icon"
                          onClick={() => handleEdit(testimonial.id)}
                        />
                        <Trash
                          size={20}
                          className="trash-icon"
                          onClick={() => handleDelete(testimonial.id)}
                        />
                      </>
                    </div>
                    {editingIndex === testimonial.id ? (
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
                          onClick={() => handleSaveEdit(testimonial.id)}
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <p>{testimonial.description}</p>
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
}
