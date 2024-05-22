import { Route, Routes } from "react-router-dom";
import { Blog } from "./page/blog";
import { BlogRTK } from "./page/blogRTK";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Blog} />
        <Route path="/rtk-query" Component={BlogRTK} />
      </Routes>
    </>
  );
}

export default App;
