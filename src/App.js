import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./Firebase";
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          alt=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-DjUJ1UJd41jhB1K_jI7jMdVNUMSwp-_1g&usqp=CAU"
        ></img>
      </div>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          imageUrl={post.imageUrl}
          username={post.username}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
