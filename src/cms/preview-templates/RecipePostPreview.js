import React from "react";
import { RecipePostTemplate } from "../../templates/recipe-post";

const RecipePostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <RecipePostTemplate
      recipe={widgetFor("recipe")}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

export default RecipePostPreview;
