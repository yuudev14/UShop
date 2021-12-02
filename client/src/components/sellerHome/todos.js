import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const todos = await axios.get("/sell-ushop/todo-data", {
          headers: { token: JSON.parse(localStorage.getItem("UShop")).token },
        });
        setTodos(todos.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="todos">
      <h2>Todos</h2>
      <div className="todoPanel">
        <Link to="/sell-UShop/pending-orders" className="panel">
          <h5>{todos.pendingOrder}</h5>
          <h4>Pending Orders</h4>
        </Link>

        <Link to="/sell-UShop/out-of-stock" className="panel">
          <h5>{todos.soldOut}</h5>
          <h4>Sold Out products</h4>
        </Link>
      </div>
    </div>
  );
};

export default Todos;
