"use client";
import { useState } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [songInput, setSongInput] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setSongInput(e.target.value);
  };

  // Add song to the list
  const addSong = () => {
    if (songInput.trim()) {
      setSongs([...songs, `/MUSIC/Library/${songInput.trim()}.m4a`]);
      setSongInput(""); // Clear the input field
    }
  };

  // Generate m3u8 content
  const generateM3U8Content = () => {
    return songs.join("\n");
  };

  // Download m3u8 file
  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([generateM3U8Content()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "playlist.m3u8";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  // Handle drag and drop of m3u8 file
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".m3u8")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const fileSongs = text.split("\n").filter((line) => line.trim() !== "");
        setSongs(fileSongs);
      };
      reader.readAsText(file);
    } else {
      alert("Please drop a valid .m3u8 file");
    }
  };

  // Prevent default behavior for drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>M3U8 Playlist Generator</h1>

      {/* Input form for adding song */}
      <div>
        <input
          type="text"
          value={songInput}
          onChange={handleInputChange}
          placeholder="Enter song name (without extension)"
        />
        <button onClick={addSong}>Add Song</button>
      </div>

      {/* Drag and Drop Area */}
      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "2px dashed #cccccc",
          textAlign: "center",
        }}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        Drag and drop an .m3u8 file here to load songs
      </div>

      {/* Display the playlist */}
      <h2>Playlist</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>

      {/* Button to download m3u8 */}
      <button onClick={downloadFile}>Download M3U8</button>
    </div>
  );
}
