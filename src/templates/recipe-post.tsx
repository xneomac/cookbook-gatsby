import React, { ReactNode } from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

interface RecipePostTemplateProps {
  recipe: ReactNode
  tags: string[]
  title: string
  helmet?: ReactNode
}

export const RecipePostTemplate = ({
  recipe,
  tags,
  title,
  helmet,
}: RecipePostTemplateProps) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RecipePost ({ data }: Props)  {
  const { markdownRemark: recipe } = data

  return (
      <RecipePostTemplate
        recipe={recipe.html}
        helmet={
          <Helmet>
            <title>{`${recipe.frontmatter.title}`}</title>
          </Helmet>
        }
        tags={recipe.frontmatter.tags}
        title={recipe.frontmatter.title}
      />
  )
}

interface Props {
  data: {
    markdownRemark: {
      id: string
      html: ReactNode
      frontmatter: {
        title: string
        tags: string[]
      }

    }
  }
}


export const pageQuery = graphql`
  query RecipePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tags
      }
    }
  }
`
