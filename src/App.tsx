import "./index.css";
import webpack from "assets/webpack.png";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1");
  }, []);

  return (
    <div className="test">
      앱!!!!
      <img src={webpack} alt="webpack" />
      <List>앱!!!!</List>
    </div>
  );
};

const List = styled.div`
  background-color: blue;
`;

export default App;
