import { useCallback, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";


const FORMATS = ["bold", "italic", "underline", "strike", "list", "link", "code-block"];

export default function TextBox({
  content,
  setContent,
  setPlainText,
  height = "16rem",       // fixed height; use "auto" to grow with content
  minHeight = "8rem",     // used when height="auto"
  maxHeight = "24rem",    // used when height="auto", then it scrolls
  placeholder = "Text (optional)",
  className = "",
  autoFocus = false
}) {


  useEffect(()=>{
    if(autoFocus){
      quillRef.current?.getEditor().focus()
    }
  },[autoFocus])
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "code-block"],
      ],
      clipboard: { matchVisual: false },
    }),
    []
  );

  const handleChange = useCallback(
    (html, _delta, _source, editor) => {
      setContent(html);
      setPlainText?.(editor.getText().trim());
    },
    [setContent, setPlainText]
  );

  return (
    <div
      className={`quill-dark ${className}`}
      style={{
        "--qd-height": height,
        "--qd-min-height": minHeight,
        "--qd-max-height": maxHeight,
      }}
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={FORMATS}
      />
    </div>
  );
}