import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { Heart, Image as ImageIcon, Video, Tag, Calendar, Trash2, Upload, Filter } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  date: string;
  tags: string[];
  description: string;
}

const moodTags = ['Joy', 'Peace', 'Goofy', 'Romantic', 'Adventure', 'Cozy', 'Silly', 'Sweet'];

const GalleryPage = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    // Here you would typically upload to Supabase storage
    // For now, we'll create local URLs
    const newItems = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      date: format(new Date(), 'yyyy-MM-dd'),
      tags: [],
      description: ''
    }));
    setMediaItems(prev => [...prev, ...newItems]);
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm']
    }
  });

  const toggleTag = (itemId: string, tag: string) => {
    setMediaItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newTags = item.tags.includes(tag)
          ? item.tags.filter(t => t !== tag)
          : [...item.tags, tag];
        return { ...item, tags: newTags };
      }
      return item;
    }));
  };

  const updateDescription = (itemId: string, description: string) => {
    setMediaItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, description } : item
    ));
  };

  const deleteItem = (itemId: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags.includes(tag));
    const matchesDate = !dateFilter || item.date === dateFilter;
    return matchesTags && matchesDate;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
          <Heart className="text-pink-500" />
          Our Memory Gallery
          <Heart className="text-pink-500" />
        </h1>
        <p className="text-gray-600 italic">Capturing our beautiful moments together...</p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`mb-8 p-8 border-2 border-dashed rounded-xl text-center transition-all duration-300 ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-purple-200 hover:border-purple-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-purple-500" size={32} />
        <p className="text-purple-800">
          {isDragActive
            ? '✨ Drop your memories here ✨'
            : 'Drag & drop photos or videos, or click to select'}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <Filter className="text-purple-600" size={24} />
          <div className="flex flex-wrap gap-2">
            {moodTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:transform hover:scale-102 transition-all duration-300"
          >
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <textarea
              value={item.description}
              onChange={(e) => updateDescription(item.id, e.target.value)}
              placeholder="Add a description..."
              className="w-full p-2 mb-4 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={2}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {moodTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(item.id, tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                    item.tags.includes(tag)
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2" />
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;