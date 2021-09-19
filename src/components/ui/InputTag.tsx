import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const InputTag = () => {
  const [state, setState] = useState({
    tags: [
      { id: "Thailand", text: "Thailand" },
      { id: "India", text: "India" },
    ],
    suggestions: [],
  });

  const handleDelete = (i: number) => {
    const { tags } = state;
    setState({
      ...state,
      tags: tags.filter((tag, index) => index !== i),
    });
  };

  const handleAddition = (tag: any) => {
    setState((state: any) => ({ ...state, tags: [...state.tags, tag] }));
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const tags = [...state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setState({ ...state, tags: newTags });
  };

  const { tags, suggestions } = state;

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </div>
  );
};

export default InputTag;
