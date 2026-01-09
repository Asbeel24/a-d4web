'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  className?: string;
  thumbnail?: string;
}

export default function AudioPlayer({
  src,
  title,
  artist,
  className = '',
  thumbnail,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 重置状态
    setError(null);
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      setIsLoading(false);
      setIsPlaying(false);
      const audioError = audio.error;
      if (audioError) {
        switch (audioError.code) {
          case audioError.MEDIA_ERR_ABORTED:
            setError('音频加载被中止');
            break;
          case audioError.MEDIA_ERR_NETWORK:
            setError('网络错误，无法加载音频');
            break;
          case audioError.MEDIA_ERR_DECODE:
            setError('音频解码错误');
            break;
          case audioError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            setError('音频格式不支持或文件不存在');
            break;
          default:
            setError('无法加载音频文件');
        }
      } else {
        setError('无法加载音频文件');
      }
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };
    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);

    // 设置新的 src 并尝试加载音频
    // 对 URL 进行编码，处理特殊字符（如 +, #, 空格等）
    let audioSrc = src;
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      // 对于相对路径，需要正确编码文件名中的特殊字符
      // 分离路径和查询参数
      const [path, query] = src.split('?');
      
      // 分离目录路径和文件名
      const lastSlashIndex = path.lastIndexOf('/');
      if (lastSlashIndex !== -1) {
        const dirPath = path.substring(0, lastSlashIndex + 1); // 包含最后的斜杠
        const fileName = path.substring(lastSlashIndex + 1);
        // 编码文件名，但保留目录路径
        const encodedFileName = encodeURIComponent(fileName);
        audioSrc = dirPath + encodedFileName + (query ? `?${query}` : '');
      } else {
        // 如果没有路径，直接编码整个字符串
        audioSrc = encodeURIComponent(path) + (query ? `?${query}` : '');
      }
    }
    
    if (audio.src !== audioSrc) {
      audio.src = audioSrc;
    }
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (error) {
      // 如果有错误，尝试重新加载
      audio.load();
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('播放错误:', err);
      setError('无法播放音频');
      setIsPlaying(false);
    }
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
          {/* 缩略图 */}
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-12 h-12 rounded object-cover border border-gray-700"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* 曲目信息和进度条 */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <div className="text-white font-medium text-sm sm:text-base truncate">{title}</div>
            <div className="text-gray-400 text-xs sm:text-sm">-{artist}</div>
            {error && (
              <div className="text-red-400 text-xs mt-1">{error}</div>
            )}
            {isLoading && !error && (
              <div className="text-gray-500 text-xs mt-1">加载中...</div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                disabled={!!error || isLoading}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: duration > 0 
                    ? `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, #1f2937 ${(currentTime / duration) * 100}%, #1f2937 100%)`
                    : undefined,
                }}
              />
            </div>
            <div className="text-white text-xs sm:text-sm flex-shrink-0 whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        preload="metadata"
      />
    </div>
  );
}

