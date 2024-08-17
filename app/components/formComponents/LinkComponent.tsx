import { ContentBlock, ContentState, CompositeDecorator, EditorState, Modifier, SelectionState } from 'draft-js';

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

const Link = (props: { contentState: { getEntity: (arg0: any) => { (): any; new(): any; getData: { (): { url: any; }; new(): any; }; }; }; entityKey: any; children: React.ReactNode }) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: 'blue', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export const createLinkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

export const onAddLink = (editorState: EditorState, setEditorState: (editorState: EditorState) => void) => {
  let linkUrl = window.prompt("Add link http:// ");
  if (linkUrl) {
    let displayLink = window.prompt("Display Text");
    if (displayLink) {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      // Check if the selection is collapsed
      const collapsedSelection = selection.isCollapsed();
      const currentContent = contentState.createEntity('LINK', 'MUTABLE', { url: linkUrl });
      const entityKey = currentContent.getLastCreatedEntityKey();

      let newContentState;
      if (collapsedSelection) {
        // Insert the link if the selection is collapsed
        newContentState = Modifier.insertText(
          contentState,
          selection,
          displayLink,
          undefined,
          entityKey
        );
      } else {
        // Apply the entity to the selected text
        newContentState = Modifier.applyEntity(
          contentState,
          selection,
          entityKey
        );
      }

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'apply-entity'
      );
      setEditorState(EditorState.createWithContent(newContentState, decorator));
    }
  }
};
