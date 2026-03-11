import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function EditPost() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {

    api.get(`/posts/${id}`).then(response => {

      setTitulo(response.data.titulo);
      setAutor(response.data.autor);
      setConteudo(response.data.conteudo);

    });

  }, [id]);

  const atualizarPost = async (e) => {

    e.preventDefault();

    await api.put(`/posts/${id}`, {
      titulo,
      autor,
      conteudo
    });

    navigate("/");

  };

  return (

    <div>

     <Link to="/">Voltar</Link>

      <h1>Editar Post</h1>

      <form onSubmit={atualizarPost}>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
        />

        <br/><br/>

        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Autor"
        />

        <br/><br/>

        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Conteúdo"
        />

        <br/><br/>

        <button type="submit">
          Atualizar Post
        </button>

      </form>

    </div>

  );

}

export default EditPost;