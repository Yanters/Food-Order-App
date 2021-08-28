import { Fragment } from "react";
import AvalibleMeals from "./AvalibleMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvalibleMeals />
    </Fragment>
  );
};

export default Meals;
