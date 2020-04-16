import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  styled,
  Paper,
  Box,
} from "@material-ui/core";
import { Link } from "gatsby";
import Tag from "../components/Tag";

const RecipesContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0, 4),
  transform: "translateY(-10vh)",
  display: "grid",
  padding: theme.spacing(2),
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(2),
  gridAutoRows: "max-content",
  [theme.breakpoints.only("xs")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    boxShadow: "none",
  },
  [theme.breakpoints.only("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.only("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.only("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  [theme.breakpoints.only("xl")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
}));

const NoRecipesFound = styled(Paper)(({ theme }) => ({
  minHeight: "20vh",
  margin: theme.spacing(0, 4),
  transform: "translateY(-10vh)",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  [theme.breakpoints.only("xs")]: {
    height: 200,
  },
  [theme.breakpoints.only("sm")]: {
    height: 200,
  },
  [theme.breakpoints.only("md")]: {
    height: 200,
  },
  [theme.breakpoints.up("lg")]: {
    height: 300,
  },
}));

const TagsContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& > *": {
    margin: theme.spacing(0, 1),
  },
}));

interface Props {
  recipes: Array<{
    id: string
    image: string;
    title: string;
    tags: string[];
    url: string
  }>;
  selectedTags: string[];
}

export default function RecipesList({ recipes, selectedTags }: Props) {
  if (recipes.length === 0) {
    return (
      <NoRecipesFound>
        <Typography>Aucune recette trouvée.</Typography>
      </NoRecipesFound>
    );
  }

  return (
    <RecipesContainer>
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={recipe.url}>
          <Card variant="outlined">
            <CustomCardMedia image={recipe.image} />
            <Box m={1}>
              <Typography variant="subtitle2">{recipe.title}</Typography>
            </Box>
            <TagsContainer>
              {recipe.tags.map((tag) => (
                <Tag
                  key={tag}
                  name={tag}
                  selected={selectedTags.includes(tag)}
                  size="small"
                />
              ))}
            </TagsContainer>
          </Card>
        </Link>
      ))}
    </RecipesContainer>
  );
}
