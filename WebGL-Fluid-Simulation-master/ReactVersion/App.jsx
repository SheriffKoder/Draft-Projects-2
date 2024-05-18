import Post from "./components/Post";
import PostList from "./components/PostsList";

import { particles } from "../utils/smoke";
import { useEffect } from "react";

function App() {

  useEffect(()=> {
    particles();
  },[]);

  return (
    // <main>
    //   <PostList />
    // </main>
    <>
    <canvas></canvas>
        <main>
            Hello World
        </main>
    </>

  );
}

export default App;