"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, List, ListOrdered, Link as LinkIcon, Quote, RotateCcw, RotateCw } from 'lucide-react';
import { useCallback } from 'react';

const ToolbarBtn = ({ 
  isActive, 
  onClick, 
  disabled,
  children 
}: { 
  isActive?: boolean, 
  onClick: () => void, 
  disabled?: boolean,
  children: React.ReactNode 
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-lg transition-colors flex items-center justify-center
      ${isActive ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5 hover:text-black'}
      ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {children}
  </button>
);

export default function RichTextEditor({ 
  content, 
  onChange 
}: { 
  content: string; 
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-tertiary underline underline-offset-4 decoration-brand-tertiary/30',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your article here...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-p:my-2 prose-h1:text-4xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-bold prose-a:text-brand-tertiary prose-strong:text-black focus:outline-none min-h-[300px] p-4 text-[15px] leading-relaxed',
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden bg-white flex flex-col focus-within:ring-1 focus-within:ring-brand-tertiary focus-within:border-brand-tertiary transition-all">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-black/5 border-b border-black/10">
        
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
          <Strikethrough size={16} />
        </ToolbarBtn>

        <div className="w-[1px] h-6 bg-black/10 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
          <Heading1 size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={16} />
        </ToolbarBtn>

        <div className="w-[1px] h-6 bg-black/10 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
          <Quote size={16} />
        </ToolbarBtn>

        <div className="w-[1px] h-6 bg-black/10 mx-1" />

        <ToolbarBtn onClick={setLink} isActive={editor.isActive('link')}>
          <LinkIcon size={16} />
        </ToolbarBtn>

        <div className="w-[1px] h-6 bg-black/10 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <RotateCcw size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <RotateCw size={16} />
        </ToolbarBtn>

      </div>
      
      {/* Editor Content Area */}
      <div className="flex-1 cursor-text bg-white p-2">
        <EditorContent editor={editor} className="w-full h-full" />
      </div>
    </div>
  );
}
