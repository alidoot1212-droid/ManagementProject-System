import { useState } from 'react'

import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'

type Props = {
  onChange: (value: string) => void
  disabled?: boolean
}

export default function EditorControlled({ onChange, disabled }: Props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleChange = (state: EditorState) => {
    setEditorState(state)

    const html = draftToHtml(convertToRaw(state.getCurrentContent()))

    onChange(html)
  }

  return (
    <EditorWrapper
      sx={{
        direction: 'ltr',
        '& .rdw-editor-toolbar': {
          direction: 'ltr',
          display: 'flex',
          flexWrap: 'wrap'
        },
        '& .rdw-editor-main': {
          minHeight: '500px'
        }
      }}
    >
      <ReactDraftWysiwyg
        editorState={editorState}
        onEditorStateChange={handleChange}
        readOnly={disabled}
        placeholder='توضیحات خود را وارد کنید...'
      />
    </EditorWrapper>
  )
}
