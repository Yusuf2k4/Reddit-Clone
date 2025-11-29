import { useRef } from "react";
import ReactQuill from "react-quill-new";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], 
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "code-block"],
];

export default function TextBox({ content, setContent, setPlainText }) {
  const quillRef = useRef(null);

  const handleChange = (html, delta, source, editor) => {
    setContent(html);
    setPlainText(editor.getText());
  };

  return (
    <div className="quill-dark mt-4">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder="Text (optional)"
        className="h-64 mb-12" // Height for editor, mb for toolbar spacing
        modules={{
          toolbar: toolbarOptions,
        }}
      />
    </div>
  );
}