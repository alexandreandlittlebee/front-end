import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  const navigate = useNavigate();

  const criarPost = async (e) => {
    e.preventDefault();

    await api.post("/posts", {
      titulo,
      autor,
      conteudo
    });

    navigate("/");
  };

  return (
    <div>

      <h1>Novo Post</h1>

      <form onSubmit={criarPost}>

        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <br/><br/>

        <textarea
          placeholder="Conteúdo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Criar Post</button>

      </form>

    </div>
  );
}

export default CreatePost;