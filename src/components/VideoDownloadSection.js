import React, { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import '../app/styles.css';
import '../app/globals.css';


const VideoDownloadSection = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPhotoLink, setIsPhotoLink] = useState(false);
  const [message, setMessage] = useState('');
  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false);
  const downloadLinkRef = useRef(null); // Ref for download link

  const handleClear = () => {
    setVideoUrl('');
    setVideoInfo(null);
    setError('');
    setIsPhotoLink(false);
    setMessage('');
    setIsDownloading(false);
    setIsDownloadingVideo(false);
    setIsDownloadingAudio(false);
  };

  useEffect(() => {
    // Ensure this effect only runs on the client side
    if (typeof window !== 'undefined') {
      if (videoUrl.trim() === '') {
        handleClear(); // Clear states if URL is empty
      } else {
        setVideoInfo(null);
        setError('');
        setIsPhotoLink(false);
        setMessage('');
      }
    }
  }, [videoUrl]);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && isDownloading) {
      setMessage("Your file is being processed...");
      const processingTimeout = setTimeout(() => {
        setMessage("Your file is being downloaded...");
      }, 10000);
  
      return () => clearTimeout(processingTimeout);
    }
  }, [isDownloading]);
  

  const debouncedFetchVideoInfo = useCallback(
    debounce(async (url) => {
      setLoading(true);
      setError('');
      setMessage('');
      try {
        const response = await fetch('/api/fetch-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Error fetching video info.');
          return;
        }

        const data = await response.json();
        setVideoInfo(data);
        setIsPhotoLink(data.isPhotoOrSlideshow);
        setMessage(data.isPhotoOrSlideshow ? "This is a slideshow or photo video, and only music is available to download." : "");
      } catch (error) {
        setError('Failed to fetch video info. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleFetch = () => {
    const trimmedUrl = videoUrl.trim();
    if (trimmedUrl) {
      debouncedFetchVideoInfo(trimmedUrl);
    } else {
      setError('Please enter a valid URL');
    }
  };

  const handleDownload = async (format) => {
    if (!videoInfo || !videoInfo.finalUrl) {
      return; // Exit early if necessary data isn't available
    }

    if (isDownloading) return;

    setIsDownloading(true);
    setError('');
    setMessage('');
    setIsDownloadingVideo(format === 'video');
    setIsDownloadingAudio(format === 'audio');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoInfo.finalUrl, option: format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error downloading media.');
        return;
      }

      const fileName = `DownloadTik_${(videoInfo.captions?.slice(0, 20) || videoInfo.username).replace(/[^a-zA-Z0-9]/g, '_') || 'Untitled'}`;
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      downloadLinkRef.current.href = downloadUrl;
      downloadLinkRef.current.download = format === 'video' ? `${fileName}.mp4` : `${fileName}.mp3`;
      downloadLinkRef.current.click();

      setMessage("Your file has been downloaded securely.");
    } catch (error) {
      setError('Failed to download media. Please try again.');
    } finally {
      setIsDownloading(false);
      setIsDownloadingVideo(false);
      setIsDownloadingAudio(false);
    }
  };

  const handlePaste = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        setVideoUrl(text);
      } catch (err) {
        setError('Failed to paste from clipboard. Please paste manually.');
      }
    }
  };
  

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center max-w-full overflow-hidden">
      <div className="flex w-full justify-center mb-6 relative">
        <div className="relative w-full flex flex-col md:flex-row max-w-full md:max-w-3xl lg:max-w-5xl">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Enter TikTok URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={`input-field w-full ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
            />
            {!videoUrl && (
              <button onClick={handlePaste} className="paste-button" aria-label="Paste URL" disabled={loading}>
                📋
              </button>
            )}
            {videoUrl && (
              <button onClick={handleClear} className="clear-button" aria-label="Clear input" disabled={loading}>
                ✕
              </button>
            )}
          </div>

          <button onClick={handleFetch} className={`fetch-button w-full md:w-auto ${loading ? 'disabled' : ''}`} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/images/loader1.gif" alt="Loading..." className="loading-icon" />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {videoInfo && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl border-4 border-black transition duration-300 hover:shadow-3xl">
            <div className="flex flex-col md:flex-row items-center">
              <img src={videoInfo.thumbnail} alt={`${videoInfo.username}'s video thumbnail`} className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6" style={{ width: '150px', height: '150px' }} />
              <div className="text-sm text-gray-700">
                <p><strong>Username:</strong> {videoInfo.username}</p>
                <p><strong>Captions:</strong> {videoInfo.captions}</p>
                <p><strong>Duration:</strong> {videoInfo.duration}</p>
                <p><strong>File Size:</strong> {videoInfo.fileSize} MB</p>
              </div>
            </div>

            <div className="mt-6 text-center relative flex flex-col md:flex-row md:justify-center">
              {isPhotoLink ? (
                <button 
                  onClick={() => handleDownload('audio')} 
                  className={`flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded mb-2 md:mb-0 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  disabled={isDownloading}>
                  <img src="/images/mp3.png" alt="Download Audio" className="w-5 h-5 mr-2" />
                  {isDownloadingAudio ? 'Downloading...' : 'Download MP3'}
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => handleDownload('video')} 
                    className={`flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded mb-2 md:mb-0 md:mr-2 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={isDownloading}>
                    <img src="/images/mp4.png" alt="Download Video" className="w-5 h-5 mr-2" />
                    {isDownloadingVideo ? 'Downloading...' : 'Download Video'}
                  </button>
                  <button 
                    onClick={() => handleDownload('audio')} 
                    className={`flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded mb-2 md:mb-0 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={isDownloading}>
                    <img src="/images/mp3.png" alt="Download Audio" className="w-5 h-5 mr-2" />
                    {isDownloadingAudio ? 'Downloading...' : 'Download MP3'}
                  </button>
                </>
              )}

              <button 
                onClick={handleClear} 
                className={`flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded md:ml-2 mt-4 md:mt-0`}>
                Clear 
              </button>
            </div>

            {(isDownloadingVideo || isDownloadingAudio) && (
              <div className="mt-4 flex justify-center">
                <img src="/images/download.gif" alt="Downloading..." className="w-16 h-16" />
              </div>
            )}

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
            <a ref={downloadLinkRef} style={{ display: 'none' }} /> {/* Hidden download link */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDownloadSection;
