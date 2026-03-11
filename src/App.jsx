import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/createPost";
import EditPost from "./pages/editPost";
import Login from "./pages/login";
import PrivateRoute from "./components/privateRoute";
import Admin from "./pages/admin";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/post/:id" element={<Post />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        }
      />

      <Route
       path="/admin"
       element={
       <PrivateRoute>
         <Admin />
       </PrivateRoute>
        }
      />

    </Routes>

  );

}

export default App;