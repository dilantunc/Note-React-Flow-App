import React, { useState } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import Modal from "react-modal";
import Note from "./Note";
import { SketchPicker } from 'react-color'; // Import the color picker

Modal.setAppElement("#root");

const FlowPage = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [newContent, setNewContent] = useState("");
  const [nodeColor, setNodeColor] = useState("#FFEB3B"); // Default color

  const onLabelChange = (id, newLabel, newContent, color) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newLabel, content: newContent, color } }
          : node
      )
    );
  };

  const onDeleteNote = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const nodeTypes = {
    special: (props) => (
      <Note
        id={props.id}
        data={props.data}
        onEdit={() => {
          setCurrentNoteId(props.id);
          setNewLabel(props.data.label);
          setNewContent(props.data.content || '');
          setNodeColor(props.data.color || "#FFEB3B"); // Set the color for editing
          setModalIsOpen(true);
        }}
        onDelete={() => onDeleteNote(props.id)}
      />
    ),
  };

  const addNote = () => {
    const lastNode = nodes[nodes.length - 1];
    
    const newPosition = lastNode 
      ? { x: lastNode.position.x + 300, y: lastNode.position.y } 
      : { x: 100, y: 100 }; 

    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: "special",
      position: newPosition,
      data: { label: `Note ${newNodeId}`, content: '', color: nodeColor },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const handleModalSubmit = () => {
    if (currentNoteId) {
      onLabelChange(currentNoteId, newLabel, newContent, nodeColor);
    } else {
      const newNodeId = (nodes.length + 1).toString();
      const newNode = {
        id: newNodeId,
        type: "special",
        position: { x: 100, y: 100 },
        data: { label: newLabel, content: newContent, color: nodeColor },
      };
      setNodes((nds) => [...nds, newNode]);
    }
    setModalIsOpen(false);
    setCurrentNoteId(null);
    setNewLabel("");
    setNewContent("");
    setNodeColor("#FFEB3B"); // Reset color
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <button
        onClick={addNote}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Not Ekle
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        style={{ backgroundColor: "#f0f0f0" }}
        onNodeDragStop={(event, node) => {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === node.id
                ? { ...n, position: { x: node.position.x, y: node.position.y } }
                : n
            )
          );
        }}
      >
        <Background variant="lines" gap={20} size={1} color="#E0E0E0" />
        <MiniMap />
        <Controls />
      </ReactFlow>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            zIndex: 20,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            margin: "10px",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "500px",
            height:"500px",
            overflowY: "auto",
            zIndex: 21,
          },
        }}
      >
        <h3 style={{ color: "#000" }}>{currentNoteId ? "Edit Note" : "Add Note"}</h3>
        <div>
          <label style={{ color: "#000" }}>Başlık:</label>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
            }}
          />
        </div>
        <div>
          <label style={{ color: "#000" }}>İçerik:</label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              minHeight: "100px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "#000" }}>Renk Seç:</label>
          <SketchPicker
            color={nodeColor}
            onChangeComplete={(color) => setNodeColor(color.hex)}
            style={{ marginTop: "10px" }}
          />
        </div>
        <button
          onClick={handleModalSubmit}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {currentNoteId ? "Update" : "Add"}
        </button>
        <button
          onClick={() => {
            setModalIsOpen(false);
            setCurrentNoteId(null);
            setNewLabel("");
            setNewContent("");
            setNodeColor("#FFEB3B");
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default FlowPage;
