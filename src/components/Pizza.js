import React from "react";
import { Link } from "react-router-dom";

const Pizza = () => {
    return (
        <div>
            <h1>Pizza of the Day</h1>
            <h2>Here is our daily special</h2>
            <img className="pizzaSpecial" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" 
            alt="bbq chicken pizza" />
            <h3>click here to order your pizza👇</h3>
            <Link className="pizza" to={"/form"}>
                <div className="order-here">Order here</div>
            </Link>
        </div>
    )
}

export default Pizza;