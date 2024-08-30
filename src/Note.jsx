import React, { useState } from "react";
import Modal from "react-modal";

const Note = ({ id, data, onEdit, onDelete }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleDetailModalOpen = () => {
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
  };

  const getPreviewContent = (content) => {
    const words = content.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return content;
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
          backgroundColor: data.color || "#FFEB3B",
          borderRadius: "4px",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          width: "200px",
          height: "200px",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          zIndex: 1, // Notların z-index değerini düşürdüm
        }}
        onDoubleClick={onEdit}
      >
        <div
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {data.label}
        </div>
        <div style={{ color: "#000" }}>{getPreviewContent(data.content)}</div>
        <div
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: "5px",
            right: "5px",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailModalOpen();
            }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderColor:"black",
              
            }}
          >
            Detail
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          X
        </button>
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={handleDetailModalClose}
        contentLabel="Note Details"
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px",
            padding: "20px",
          },
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2>{data.label}</h2>
        <p>{data.content}</p>
        <button
          onClick={handleDetailModalClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default Note;
