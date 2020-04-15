import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

export const RecipePostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
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

const RecipePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <div>
      //@ts-ignore
      <RecipePostTemplate
        content={post.html}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Recipe">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </div>
  )
}

export default RecipePost

export const pageQuery = graphql`
  query RecipePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
    }
  }
`
