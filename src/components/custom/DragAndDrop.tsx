import { useRef, useState, Dispatch, SetStateAction } from "react";

interface DragAndDropProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}
export default function DragAndDrop({ files, setFiles }: DragAndDropProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevState) => [...prevState, ...selectedFiles]);
    }
  }

  

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevState) => [...prevState, ...droppedFiles]);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: string) {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-white"
        }  p-4 w-full rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center border-2 border-black border-dashed`}
        onDragEnter={handleDragEnter}
        
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <p>
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name)}
              >
                remove
              </span>
            </div>
          ))}
        </div>

        
      </form>
    </div>
  );
}
