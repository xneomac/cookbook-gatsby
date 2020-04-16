import React, { useState } from "react";
import Tag from "./Tag";
import { styled, TextField } from "@material-ui/core";

const TagsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: theme.spacing(2, 0),
  "& > *": {
    margin: 4
  }
}));

interface Props {
  tags: string[];
  onTagsChange?: (tags: string[]) => void;
  onSearchChange?: (searchStringselectedTags: string) => void;
}

export default function Search({ tags, onTagsChange, onSearchChange }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function handleTagSelected(tag: string) {
    let newSelectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);
    onTagsChange?.(newSelectedTags);
  }

  return (
    <>
      <TextField
        label="Rechercher une recette"
        variant="outlined"
        color="secondary"
        onChange={e => onSearchChange?.(e.target.value)}
      />

      <TagsContainer>
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Tag
              key={tag}
              name={tag}
              color="secondary"
              selected={isSelected}
              onClick={() => handleTagSelected(tag)}
            />
          );
        })}
      </TagsContainer>
    </>
  );
}
