import React from "react";
import { RecipePostTemplate } from "../../templates/recipe-post";

const RecipePostPreview = ({ entry, getAsset, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const ingredients = entry.getIn(["data", "ingredients"]);
  return (
    <RecipePostTemplate
      content={widgetFor("body")}
      title={entry.getIn(["data", "title"])}
      duration={entry.getIn(["data", "duration"])}
      servings={entry.getIn(["data", "servings"])}
      ingredients={ingredients && ingredients.toJS()}
      image={getAsset(entry.getIn(["data", "image"]))}
      tags={tags && tags.toJS()}
    />
  );
};

export default RecipePostPreview;