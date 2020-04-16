import React, { useState, useMemo } from "react";
import { Typography, styled, Link as MuiLink, Box } from "@material-ui/core";
import { graphql } from "gatsby";
import Search from "../components/Search";
import Fuse from "fuse.js";
import Helmet from "react-helmet";
import RecipesList from "../components/RecipesList";

const Root = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

type HeroProps = { image: string };
const Hero = styled(({ image: _, ...props }: HeroProps) => <div {...props} />)({
  backgroundImage: ({ image }: HeroProps) => `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "10vh",
  flexDirection: "column",
});

const HeroTitle = styled((props) => (
  <Typography align="center" variant="h2" {...props} />
))(({ theme }) => ({
  color: theme.palette.common.white,
  textShadow: "1px 1px #000",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only("xs")]: {
    fontSize: "2rem",
  },
}));

const fuseOptions = {
  limit: 10,
  keys: ["title"],
  isCaseSensitive: false,
  includeMatches: true,
};

export interface Recipe {
  id: string;
  title: string;
  tags: string[];
  image: string;
  url: string
}

export default function IndexPage({ data }: Props) {
  const [searchString, setSearchString] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const recipes: Recipe[] = data.allMarkdownRemark.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.frontmatter.title,
    tags: edge.node.frontmatter.tags,
    image: edge.node.frontmatter.image.childImageSharp.fluid.src,
    url: edge.node.fields.slug
  }));

  const tags = useMemo(() => {
    if (!recipes) {
      return undefined;
    }
    const tags = recipes.reduce((acc, recipe) => {
      recipe.tags.forEach((t) => acc.add(t));
      return acc;
    }, new Set<string>());
    return [...tags].sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (!searchString && selectedTags.length === 0) {
      return recipes;
    }
    let filteredBySearchString: Recipe[] = recipes;
    if (searchString) {
      const fuse = new Fuse(recipes, fuseOptions);
      const results = fuse.search(searchString);
      filteredBySearchString = results.map(({ item }) => item);
    }

    if (selectedTags.length > 0) {
      return filteredBySearchString.filter(
        (r) =>
          r.tags.filter((t) => selectedTags.some((st) => st === t)).length ===
          selectedTags.length
      );
    } else {
      return filteredBySearchString;
    }
  }, [recipes, searchString, selectedTags]);

  return (
    <Root>
      <Helmet>
        <title>{data.markdownRemark.frontmatter.title}</title>
      </Helmet>
      <Hero
        image={data.markdownRemark.frontmatter.image.childImageSharp.fluid.src}
      >
        <HeroTitle>{data.markdownRemark.frontmatter.title}</HeroTitle>
        <Search
          tags={tags}
          onSearchChange={setSearchString}
          onTagsChange={setSelectedTags}
        />
      </Hero>

      <RecipesList recipes={filteredRecipes} selectedTags={selectedTags} />

      <Box flexGrow={1} />
      <Box mb={4} width="100%">
        <Typography variant="subtitle1" align="center">
          Fait avec amour par{" "}
          <MuiLink
            href="https://github.com/JulienUsson/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Julien Usson
          </MuiLink>
        </Typography>
        <Typography variant="caption" align="center">
          <div>
            <MuiLink href="/admin/" color="textSecondary">
              Admin
            </MuiLink>
          </div>
        </Typography>
      </Box>
    </Root>
  );
}

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        image: {
          childImageSharp: { fluid: { src: string } };
        };
      };
    };
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
            tags: string[];
            image: {
              childImageSharp: { fluid: { src: string } };
            };
          };
        };
      }>;
    };
  };
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "recipe-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 512, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
