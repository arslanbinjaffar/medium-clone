import {
  createContext,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditorContent, type Editor } from "@tiptap/react";
import useTiptapEditor, { type UseTiptapEditorOptions } from "../hooks/useTiptapEditor";
import clsx from "clsx";
import CodeMirrorEditor from "@/components/SourceEditor/Editor";

type TiptapContextType = {
  editor: Editor;
  contentElement: RefObject<HTMLDivElement | null>;
  isFullScreen: boolean;
  isResizing: boolean;
  isSourceMode: boolean;
  toggleFullScreen: () => void;
  toggleSourceMode: () => void;
  setIsResizing: (value: boolean) => void;
};

const TiptapContext = createContext<TiptapContextType>({} as TiptapContextType);
export const useTiptapContext = () => useContext(TiptapContext);

type TiptapProviderProps = {
  slotBefore?: ReactNode;
  slotAfter?: ReactNode;
  editorOptions: UseTiptapEditorOptions;
  editorProps?: HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
};

 const TiptapProvider = ({
  children,
  editorOptions,
  editorProps,
  slotBefore,
  slotAfter,
}: TiptapProviderProps) => {
  const contentElement = useRef<HTMLDivElement | null>(null);
  const editor = useTiptapEditor(editorOptions);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!editor) return;
  
    // Function to apply highlight based on selection (modify condition as needed)
    const highlightSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
  
      const range = selection.getRangeAt(0);
      const contentEl = contentElement.current;
      if (!contentEl || !contentEl.contains(range.commonAncestorContainer)) return;
  
      const editorHTML = editor.getHTML();
      const selectedText = selection.toString().trim();
  
      // Here we compare selected text to the full content’s text.
      // Adjust this condition if needed.
      if (
        selectedText &&
        selectedText === editorHTML.replace(/<[^>]+>/g, "").trim() &&
        !editor.isActive("highlight")
      ) {
        editor.chain().focus().setMark("highlight", { class: "highlight-text" }).run();
      }
    };
  
    // Listen for selection changes to apply the highlight mark
    document.addEventListener("selectionchange", highlightSelection);
  
    // Handler to remove highlight on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        editor.chain().focus().unsetMark("highlight").run();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  
    const handleClick = (e: MouseEvent) => {
      const contentEl = contentElement.current;
      if (!contentEl) return;
      let target = e.target as HTMLElement;
      while (target && target !== contentEl) {
        if (target.classList.contains("highlight-text")) {
          editor.chain().focus().unsetMark("highlight").run();
          break;
        }
        target = target.parentElement!;
      }
    };
  
    contentElement.current?.addEventListener("click", handleClick);
  
    return () => {
      document.removeEventListener("selectionchange", highlightSelection);
      document.removeEventListener("keydown", handleKeyDown);
      contentElement.current?.removeEventListener("click", handleClick);
    };
  }, [editor]);
  
  
  

  if (!editor) {
    return null;
  }

  const focusEditorViaContainer = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const content = contentElement.current;
    if (content && target.contains(content)) {
      content.style.display = "flex";
      setTimeout(() => {
        content.style.display = "";
      }, 0);
    }
  };

  const editorContent = (
    <div className={clsx("rte-editor", isFullScreen && "rte-editor--fullscreen")}>
      {slotBefore}
      <div className="rte-editor__container" onMouseDown={focusEditorViaContainer}>
        {isSourceMode ? (
          <CodeMirrorEditor initialContent={editor.getHTML() || ""} />
        ) : (
          <EditorContent ref={contentElement} editor={editor} className="rte-editor__content" />
        )}
      </div>
      {children}
      {slotAfter}
    </div>
  );

  return (
    <TiptapContext.Provider
      value={{
        editor,
        contentElement,
        isFullScreen,
        isResizing,
        isSourceMode,
        setIsResizing,
        toggleFullScreen: () => setIsFullScreen((prev) => !prev),
        toggleSourceMode: () => setIsSourceMode((prev) => !prev),
      }}
    >
      {editorContent}
    </TiptapContext.Provider>
  );
};

export default TiptapProvider;
