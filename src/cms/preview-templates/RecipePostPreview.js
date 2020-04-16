import React from 'react'
import { RecipePostTemplate } from '../../templates/recipe-post'
import PreviewContainer from '../PreviewContainer'

const RecipePostPreview = ({ entry, getAsset, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const ingredients = entry.getIn(['data', 'ingredients'])
  return (
    <PreviewContainer>
      <RecipePostTemplate
        content={widgetFor('body')}
        title={entry.getIn(['data', 'title'])}
        duration={entry.getIn(['data', 'duration'])}
        servings={entry.getIn(['data', 'servings'])}
        ingredients={ingredients && ingredients.toJS()}
        image={getAsset(entry.getIn(['data', 'image']))}
        tags={tags && tags.toJS()}
      />
    </PreviewContainer>
  )
}

export default RecipePostPreview
