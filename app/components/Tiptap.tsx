'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'

const COLORS = ['#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff']

const MenuBar = ({ editor }: { editor: NonNullable<ReturnType<typeof useEditor>> }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-1 border-b border-zinc-700 p-2 mb-2">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level }) ? 'bg-zinc-600' : 'hover:bg-zinc-700'}`}
        >
          H{level}
        </button>
      ))}

      <div className="w-px bg-zinc-700 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded font-bold text-sm ${editor.isActive('bold') ? 'bg-zinc-600' : 'hover:bg-zinc-700'}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded italic text-sm ${editor.isActive('italic') ? 'bg-zinc-600' : 'hover:bg-zinc-700'}`}
      >
        I
      </button>

      <div className="w-px bg-zinc-700 mx-1" />

      <div className="flex gap-1 items-center">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => editor.chain().focus().setColor(color).run()}
            className={`w-5 h-5 rounded-full border ${editor.isActive('textStyle', { color }) ? 'border-white scale-110' : 'border-zinc-500'}`}
            style={{ backgroundColor: color }}
          />
        ))}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="px-2 py-1 rounded text-xs hover:bg-zinc-700"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
  })

  return (
    <div className="border border-zinc-700 rounded p-2 bg-zinc-900">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
