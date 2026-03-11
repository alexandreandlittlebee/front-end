import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Admin() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    api.get("/posts")
      .then(response => {

        const postsOrdenados = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(postsOrdenados);

      });

  }, []);

  const deletarPost = async (id) => {

    if (!window.confirm("Deseja excluir este post?")) return;

    await api.delete(`/posts/${id}`);

    setPosts(posts.filter(post => post._id !== id));

  };

  return (

    <div>

      <h1>Painel do Professor</h1>

      <Link to="/create">
        <button>Criar Novo Post</button>
      </Link>

      <br/><br/>

      {posts.map(post => (

        <div key={post._id}>

          <h2>{post.titulo}</h2>

          <p><strong>Autor:</strong> {post.autor}</p>

          <Link to={`/edit/${post._id}`}>
            <button>Editar</button>
          </Link>

          <button onClick={() => deletarPost(post._id)}>
            Excluir
          </button>

          <hr/>

        </div>

      ))}

    </div>

  );

}

export default Admin;