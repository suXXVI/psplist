"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HowToUse from "./howTo/HowToUse";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [songInput, setSongInput] = useState("");
  const [extension, setExtension] = useState(".mp3");

  const route = useRouter();

  // Handle input change
  const handleInputChange = (e) => {
    setSongInput(e.target.value);
  };

  // Add song to the list
  const addSong = () => {
    if (songInput.trim()) {
      setSongs([...songs, `/MUSIC/Library/${songInput.trim()}${extension}`]);
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
    setSongs([]);
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
    <div className="flex justify-center flex-col items-center">
      <h1 className="mb-3 text-3xl font-bold mt-6">PSPlaylist Creator</h1>
      <button className="mb-10 underline" onClick={() => route.push("/howTo")}>
        How to use
      </button>

      {/* Input form for adding song */}
      <div className="flex flex-row gap-3">
        <input
          type="text"
          value={songInput}
          onChange={handleInputChange}
          placeholder="Enter song name (without extension)"
          className="w-96 py-2 px-4 rounded-md text-gray-900"
        />
        <select
          className="text-gray-900 px-2"
          onChange={(e) => setExtension(e.target.value)}
        >
          <option>.mp3</option>
          <option>.m4a</option>
        </select>
        <button
          className="py-2 px-4 bg-sky-400 text-white font bold rounded-md active:bg-sky-700 disabled:bg-gray-600 disabled:text-gray-500"
          onClick={addSong}
          disabled={!songInput}
        >
          Add Song
        </button>
      </div>

      {/* Drag and Drop Area */}
      <div
        className="mt-12 p-10 border-2 border-dashed text-center mb-12"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        Drag and drop an .m3u8 file here to update existing playlist
      </div>

      {/* Display the playlist */}
      {songs.length >= 1 && (
        <div className="border-2 border-white py-5 px-2 w-1/2 mb-12">
          <h2 className="text-center font-bold text-2xl border-b mb-2 pb-2">
            Playlist
          </h2>
          <ul className="flex flex-start flex-col">
            {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Button to download m3u8 */}
      <button
        className="py-2 px-4 bg-sky-400 text-white font bold rounded-md active:bg-sky-700 disabled:bg-gray-600 disabled:text-gray-500"
        onClick={downloadFile}
        disabled={songs.length < 1}
      >
        Download .m3u8
      </button>
    </div>
  );
}
