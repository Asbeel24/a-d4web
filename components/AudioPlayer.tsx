'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  className?: string;
}

export default function AudioPlayer({
  src,
  title,
  artist,
  className = '',
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm p-4 rounded border border-gray-800/50 transition-all group ${className}`}>
      <div className="flex items-start gap-4">
        {/* 播放按钮和缩略图区域 */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all active:scale-95 group-hover:bg-white/20"
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          {/* 占位符缩略图 */}
          <div className="w-12 h-12 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
            </svg>
          </div>
        </div>
        
        {/* 曲目信息和进度条 */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <div className="text-white font-medium text-sm sm:text-base truncate">{title}</div>
            <div className="text-gray-400 text-xs sm:text-sm">-{artist}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, #1f2937 ${(currentTime / duration) * 100}%, #1f2937 100%)`,
                }}
              />
            </div>
            <div className="text-white text-xs sm:text-sm flex-shrink-0 whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

