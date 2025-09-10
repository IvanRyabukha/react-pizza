import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Pizza } from "../types/Pizza";

export const SinglePizza: React.FC = () => {
  const [singlePizza, setSinglePizza] = useState<Pizza | null>(null);
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  const fetchPizzaById = async () => {
    try {
      const { data } = await axios.get(
        `https://68a7506d639c6a54e9a1aeba.mockapi.io/items/${pizzaId}`
      );

      setSinglePizza(data);
    } catch (error) {
      alert("Ошибка при получении пиццы!");
      navigate('/');
    }
  };

  useEffect(() => {
    fetchPizzaById();
  }, []);

  if (!singlePizza) {
    return (
      <p>'Загрузка...'</p>
    );
  }

  return (
    <div className="container">
      <img src={singlePizza.imageUrl} alt={singlePizza.title} />
      <h2>{singlePizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        hic quam dicta deleniti voluptates dolores consequatur ex voluptatum,
        modi magni fuga accusamus necessitatibus reiciendis at ea officia maxime
        omnis dolor.
      </p>
      <h4>{singlePizza.price}</h4>
    </div>
  );
};
