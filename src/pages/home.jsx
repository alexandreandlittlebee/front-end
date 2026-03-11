import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {

  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState("");

  const auth = localStorage.getItem("auth");

  useEffect(() => {

    api.get("/posts")
      .then(response => {

        const postsOrdenados = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(postsOrdenados);

      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const postsFiltrados = posts.filter(post =>
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const deletarPost = async (id) => {

    if (!window.confirm("Deseja excluir este post?")) return;

    try {

      await api.delete(`/posts/${id}`);

      setPosts(posts.filter(post => post._id !== id));

    } catch (error) {

      console.error(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("auth");

    window.location.reload();

  };

  return (

    <div>

      <header>
        <h1>Blog Educacional</h1>
      </header>

      <div className="container">

        {!auth ? (

          <Link to="/login">
            <button>Login Professor</button>
          </Link>

        ) : (

          <button onClick={logout}>
            Logout
          </button>

        )}

        <br /><br />

        {auth && (

          <Link to="/admin">
            <button>Painel Admin</button>
          </Link>

        )}

        <br /><br />

        <Link to="/create">
          <button>Criar Post</button>
        </Link>

        <br /><br />

        <input
          type="text"
          placeholder="Buscar posts..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <br /><br />

        {postsFiltrados.map(post => (

          <div key={post._id}>

            <Link to={`/post/${post._id}`}>
              <h2>{post.titulo}</h2>
            </Link>

            <p><strong>Autor:</strong> {post.autor}</p>

            <p>{post.conteudo.substring(0,150)}...</p>

            <Link to={`/edit/${post._id}`}>
              <button>Editar</button>
            </Link>

            <button onClick={() => deletarPost(post._id)}>
              Excluir
            </button>

            <hr />

          </div>

        ))}

      </div>

    </div>

  );

}

export default Home;