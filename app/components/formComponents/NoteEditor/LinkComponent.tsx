import React from 'react';
import { ContentBlock, ContentState, CompositeDecorator, EditorState, Modifier } from 'draft-js';

// Strategy to find LINK entities
const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

// Link component to render the link
const Link = (props: { contentState: ContentState; entityKey: any; children: React.ReactNode }) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: 'blue', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

// Create a decorator for handling links
export const createLinkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

// Function to handle adding a link
export const onAddLink = (editorState: EditorState) : EditorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();

  // Get the selected text
  let selectedText = '';
  if (!selection.isCollapsed()) {
    const startBlock = contentState.getBlockForKey(startKey);
    const endBlock = contentState.getBlockForKey(endKey);
    if (startBlock && endBlock) {
      const startOffset = selection.getStartOffset();
      const endOffset = selection.getEndOffset();
      selectedText = startBlock.getText().slice(startOffset, endOffset);
    }
  }

  const linkUrl = window.prompt("Add link http:// ");
  if (linkUrl) {
    const displayLink = selectedText || linkUrl; // Use selected text if available, otherwise fallback to URL

    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: linkUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let newContentState;
    if (selection.isCollapsed()) {
      // Insert the link text if selection is collapsed
      newContentState = Modifier.insertText(
        contentStateWithEntity,
        selection,
        displayLink,
        undefined,
        entityKey
      );
    } else {
      // Apply the entity to the selected text
      newContentState = Modifier.replaceText(
        contentStateWithEntity,
        selection,
        displayLink,
        undefined,
        entityKey
      );
    }

    // Update the editor state
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'apply-entity'
    );
    return newEditorState;
  }
  return editorState;
};