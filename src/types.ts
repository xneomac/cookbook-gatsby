export interface Recipe {
  title: string;
  image?: string;
  tags: string[];
  duration: string;
  servings: number;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  quantity?: number;
  unit?: string;
  name: string;
}
