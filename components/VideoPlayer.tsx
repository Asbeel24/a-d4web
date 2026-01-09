'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  showMuteButton?: boolean;
}

export default function VideoPlayer({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = false,
  showMuteButton = true,
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(muted);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // 对文件路径进行 URL 编码，只编码文件名部分，保留路径结构
  // 对于 public 文件夹中的文件，Next.js 会自动处理，但编码文件名可以确保特殊字符正确处理
  const encodedSrc = (() => {
    try {
      const parts = src.split('/');
      const lastIndex = parts.length - 1;
      // 只编码最后一个部分（文件名），保留路径分隔符
      if (lastIndex >= 0 && parts[lastIndex]) {
        parts[lastIndex] = encodeURIComponent(parts[lastIndex]);
      }
      return parts.join('/');
    } catch (e) {
      console.warn('Failed to encode video src:', src, e);
      return src; // 如果编码失败，返回原始路径
    }
  })();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e: Event) => {
      setHasError(true);
      const error = video.error;
      let errorMsg = '视频加载失败';
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMsg = '视频加载被中止';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMsg = '网络错误，无法加载视频';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMsg = '视频解码失败，格式可能不支持';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg = '视频格式不支持';
            break;
          default:
            errorMsg = `视频加载错误 (${error.code})`;
        }
        console.error('Video load error:', {
          code: error.code,
          message: error.message,
          src: src,
          encodedSrc: encodedSrc,
          error: error
        });
      }
      setErrorMessage(errorMsg);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    const handleLoadedData = () => {
      setHasError(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    if (autoPlay && isPlaying) {
      video.play().catch((err) => {
        console.warn('Auto-play failed:', err);
      });
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [autoPlay, isPlaying, src, encodedSrc]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (hasError) {
    return (
      <div className={`relative ${className} bg-gray-900/50 flex items-center justify-center`}>
        <div className="text-center text-gray-400">
          <p className="text-sm">{errorMessage || '视频加载失败'}</p>
          <p className="text-xs mt-2 opacity-75">{src.split('/').pop()}</p>
          <p className="text-xs mt-1 opacity-50">请检查文件格式和路径</p>
        </div>
      </div>
    );
  }

  const handleVideoClick = () => {
    if (!autoPlay) {
      togglePlay();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={encodedSrc}
        className="w-full h-full object-cover cursor-pointer"
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        controls={showControls}
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
      />
      {showMuteButton && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded transition-colors"
          aria-label={isMuted ? '取消静音' : '静音'}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.618 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.618l3.765-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.618 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.618l3.765-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}






