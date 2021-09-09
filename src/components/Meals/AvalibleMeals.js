import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvalibleMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvalibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-a64f7-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Not Found.");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setHttpError(err.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.MealsError}>{httpError}</section>;
  }

  const MealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvalibleMeals;
