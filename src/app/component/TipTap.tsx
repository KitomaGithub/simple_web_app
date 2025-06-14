// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [
  StarterKit
]

const Tiptap = ({className, getContent, content} : Props) => {
  const editor = useEditor({
    extensions,
    content: content,
    editorProps: {
      attributes: {
        class: `${className}`
      }
    },
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      getContent(html)
      
    },
    immediatelyRender: false
  })

  return (
    <>
      <EditorContent editor={editor}/>
    </>
  )
}

interface Props {
  className?: string,
  content?: string,
  getContent: (val :string) => void
}

export default Tiptap
