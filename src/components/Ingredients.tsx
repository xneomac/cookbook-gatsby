import React, { useState, useMemo, useEffect } from "react";
import { Typography, IconButton, styled } from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

interface Ingredient {
  quantity?: number;
  unit?: string;
  name: string;
}

function strToIngredient(ingredient: string): Ingredient | undefined {
  const regex = /^([0-9.]+)([a-zA-Zèàé]*) (.*)$/gi;

  if (regex.test(ingredient)) {
    // reset regex
    regex.lastIndex = 0;
    const args = regex.exec(ingredient);
    if (!args) {
      return undefined;
    }
    return {
      quantity: Number.parseFloat(args[1]),
      unit: args[2] || undefined,
      name: args[3],
    };
  } else {
    return { name: ingredient };
  }
}

const ServingsSelector = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: 150,
}));

const Unit = styled("span")({
  fontWeight: 500,
});

interface Props {
  ingredients: string[];
  servings: number;
}

function formatNumber(number: number): string {
  const str = number.toString();
  if (str.indexOf(".") !== -1) {
    return number.toFixed(2);
  }
  return str;
}

export default function Ingredients({
  ingredients: ingredientsProp,
  servings: servingsProp,
}: Props) {
  const [servings, setServings] = useState<number>(servingsProp);
  useEffect(() => {
    setServings(servingsProp);
  }, [servingsProp]);

  const parsedIngredients = useMemo(
    () => ingredientsProp.map(strToIngredient).filter((x) => x) as Ingredient[],
    [ingredientsProp, servings, servingsProp]
  );
  const ingredients = useMemo(() => {
    return parsedIngredients.map((i) => ({
      ...i,
      quantity: i.quantity && (i.quantity * servings) / servingsProp,
    }));
  }, [parsedIngredients, servings, servingsProp]);

  return (
    <div>
      <Typography variant="h6">Personnes :</Typography>
      <ServingsSelector>
        <IconButton
          aria-label="minus"
          onClick={() => {
            if (servings > 1) {
              setServings(servings - 1);
            }
          }}
        >
          <MinusIcon />
        </IconButton>
        <Typography>{servings}</Typography>
        <IconButton aria-label="plus" onClick={() => setServings(servings + 1)}>
          <PlusIcon />
        </IconButton>
      </ServingsSelector>
      <Typography variant="h6">Ingrédients :</Typography>
      {ingredients.map((ingredient, index) => (
        <Typography key={index}>
          -{" "}
          {ingredient.quantity && (
            <Unit>
              {formatNumber(ingredient.quantity)}
              {ingredient.unit}{" "}
            </Unit>
          )}
          {ingredient.name}
        </Typography>
      ))}
    </div>
  );
}
