'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'

export default function TiptapRenderer({ content }: { content: Record<string, any> }) {
    const editor = useEditor({
        extensions: [StarterKit, TextStyle, Color],
        content,
        editable: false,
        immediatelyRender: false,
    })

    return <EditorContent editor={editor} />
}
