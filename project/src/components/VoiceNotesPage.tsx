import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mic, Play, Pause, Upload, Trash2 } from 'lucide-react';

interface VoiceNote {
  id: string;
  url: string;
  title: string;
  date: string;
}

const VoiceNotesPage = () => {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const newVoiceNote: VoiceNote = {
          id: Date.now().toString(),
          url: audioUrl,
          title: `Voice Note ${voiceNotes.length + 1}`,
          date: new Date().toLocaleDateString()
        };
        setVoiceNotes(prev => [...prev, newVoiceNote]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const togglePlayback = (noteId: string, audioUrl: string) => {
    if (currentlyPlaying === noteId) {
      const audio = document.getElementById(noteId) as HTMLAudioElement;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (currentlyPlaying) {
        const prevAudio = document.getElementById(currentlyPlaying) as HTMLAudioElement;
        prevAudio?.pause();
      }
      const audio = document.getElementById(noteId) as HTMLAudioElement;
      audio.play();
      setCurrentlyPlaying(noteId);
    }
  };

  const deleteNote = (noteId: string) => {
    setVoiceNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const audioUrl = URL.createObjectURL(file);
      const newVoiceNote: VoiceNote = {
        id: Date.now().toString(),
        url: audioUrl,
        title: file.name.replace(/\.[^/.]+$/, ""),
        date: new Date().toLocaleDateString()
      };
      setVoiceNotes(prev => [...prev, newVoiceNote]);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
          <Heart className="text-pink-500" />
          Whispers from the Heart
          <Heart className="text-pink-500" />
        </h1>
        <p className="text-gray-600 italic">Share your voice, share your love...</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Recording Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <Mic className={`${isRecording ? 'animate-pulse' : ''}`} size={20} />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          <label className="px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full cursor-pointer flex items-center gap-2">
            <Upload size={20} />
            Upload Audio
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Voice Notes List */}
        <div className="space-y-4">
          {voiceNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md flex items-center gap-4"
            >
              <audio id={note.id} src={note.url} onEnded={() => setCurrentlyPlaying(null)} />
              
              <motion.div
                animate={currentlyPlaying === note.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-pink-500"
              >
                <Heart size={24} />
              </motion.div>

              <div className="flex-1">
                <h3 className="font-semibold text-purple-800">{note.title}</h3>
                <p className="text-sm text-gray-500">{note.date}</p>
              </div>

              <button
                onClick={() => togglePlayback(note.id, note.url)}
                className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700"
              >
                {currentlyPlaying === note.id ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceNotesPage;