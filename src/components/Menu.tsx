type Meal = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type MenuProps = {
  meals: Meal[];
};

export default function Menu({ meals }: MenuProps) {
  return (
    <>
      {meals.map((meal: Meal, index: number) => {
        return (
          <div key={index}>
            <img
              src={import.meta.env.VITE_PORT_MAIN + meal.image}
              alt={meal.name + " photo"}
            />
            <p>{meal.name}</p>
          </div>
        );
      })}
    </>
  );
}
