import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Post() {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {

    api.get(`/posts/${id}`).then(response => {

      setPost(response.data);

    });

  }, [id]);

  if (!post) {

    return <p>Carregando...</p>;

  }

  return (

    <div>

      <Link to="/">Voltar</Link>

      <h1>{post.titulo}</h1>

      <p><strong>Autor:</strong> {post.autor}</p>

      <p>{post.conteudo}</p>

    </div>

  );

}

export default Post;