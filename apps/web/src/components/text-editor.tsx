"use client";

import { useEditor, Tiptap, type JSONContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";

import StarterKit from "@tiptap/starter-kit";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Heading,
  List,
  Undo,
  Redo,
} from "lucide-react";

import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";







function TextEditor({ initialContent, content, onChange }: { initialContent?: JSONContent; content: JSONContent; onChange: (content: JSONContent) => void }) {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      TaskList,
      TaskItem.configure({
        nested: true,
      }),

      Link.configure({
        openOnClick: false,
      })
    ],

    content: content,

    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor || !initialContent) return;

    editor.commands.setContent(initialContent);

  }, [initialContent]);


  if (!editor) {
    return null;
  }


  return (
    <Tiptap editor={editor}>

      {/* Main editor */}
      <div className="rounded-lg border">

        {/* Toolbar */}
        <div className="flex items-center gap-1 border-b p-2">

          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
            className={
              editor.isActive("bold")
                ? "bg-muted"
                : ""
            }
          >
            <Bold className="size-4" />
          </Button>


          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <Italic className="size-4" />
          </Button>


          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              editor.chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          >
            <Heading className="size-4" />
          </Button>


          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              editor.chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          >
            <List className="size-4" />
          </Button>


          <div className="ml-auto flex gap-1">

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                editor.chain().focus().undo().run()
              }
            >
              <Undo className="size-4" />
            </Button>


            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                editor.chain().focus().redo().run()
              }
            >
              <Redo className="size-4" />
            </Button>

          </div>

        </div>


        <Tiptap.Content
          className="
                        min-h-[500px]
                        p-6
                        prose
                        max-w-none
                        focus:outline-none
                        focus:ring-0
                    "
        />

      </div>



      {/* Floating bubble menu */}
      <BubbleMenu editor={editor}>

        <div className="flex gap-1 rounded-md border bg-background p-1 shadow">

          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain()
                .focus()
                .toggleBold()
                .run()
            }
          >
            Bold
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain()
                .focus()
                .toggleItalic()
                .run()
            }
          >
            Italic
          </Button>

        </div>

      </BubbleMenu>


      {/* Slash-style floating menu */}
      <FloatingMenu editor={editor}>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            editor.chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
        >
          Add heading
        </Button>

      </FloatingMenu>


    </Tiptap>
  );
}


export default TextEditor;