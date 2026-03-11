import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const fazerLogin = (e) => {

    e.preventDefault();

    if (usuario === "professor" && senha === "1234") {

      localStorage.setItem("auth", "true");

      navigate("/");

    } else {

      alert("Usuário ou senha inválidos");

    }

  };

  return (

    <div>

      <Link to="/">Voltar</Link>

      <h1>Login Professor</h1>

      <form onSubmit={fazerLogin}>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>

  );

}

export default Login;