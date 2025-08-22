import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const MediaRenderer = ({ media, skillName }) => {
  if (!media) return null;

  switch (media.type) {
    case "image":
      return (
        <img
          src={media.url}
          alt={skillName}
          className="w-full h-auto object-contain rounded-xl shadow-lg"
        />
      );

    case "video":
      return (
        <video
          src={media.url}
          controls
          className="w-full h-auto object-contain rounded-xl shadow-lg"
        />
      );

    case "pdf":
      return (
        <div className="w-full h-auto rounded-xl shadow-lg">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={media.url} />
          </Worker>
         
        </div>
      );

    default:
      return null;
  }
};
