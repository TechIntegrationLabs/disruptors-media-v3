import React, { useState, useRef } from 'react';

const VideoGallery: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // PRD Video Assets
  const videos = [
    {
      id: 1,
      title: 'Gallery Video 1',
      src: '/videos/gallery-1.mp4',
      poster: '/images/gallery-1-poster.jpg'
    },
    {
      id: 2,
      title: 'Gallery Video 2', 
      src: '/videos/gallery-2.mp4',
      poster: '/images/gallery-2-poster.jpg'
    },
    {
      id: 3,
      title: 'Show Reel',
      src: '/videos/show-reel.mp4',
      poster: '/images/show-reel-poster.jpg'
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="w-full py-20 bg-pure-black">
      <div className="container-custom">
        {/* Section Title */}
        <h2 
          className="text-brand-cream mb-16"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '63px',
            fontWeight: 600,
            lineHeight: '68.6px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '54px'
          }}
        >
          VIDEO GALLERY
        </h2>

        {/* Main Video Player */}
        <div className="relative mb-8">
          <div 
            className="relative"
            style={{
              backgroundImage: 'url(/images/gallery-frame.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster={videos[currentVideo].poster}
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videos[currentVideo].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="bg-brand-charcoal text-brand-cream p-4 rounded-full hover:bg-opacity-80 transition-all"
                >
                  {isPlaying ? (
                    <img src="/images/pause-icon.png" alt="Pause" className="w-6 h-6" />
                  ) : (
                    <img src="/images/play-icon.png" alt="Play" className="w-6 h-6" />
                  )}
                </button>

                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className="bg-brand-charcoal text-brand-cream p-4 rounded-full hover:bg-opacity-80 transition-all"
                >
                  <img src="/images/mute-icon.png" alt={isMuted ? "Unmute" : "Mute"} className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Thumbnails */}
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setCurrentVideo(index)}
              className={`relative aspect-video overflow-hidden rounded-lg ${
                currentVideo === index ? 'ring-4 ring-brand-cream' : ''
              }`}
            >
              <img 
                src={video.poster}
                alt={video.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-brand-charcoal bg-opacity-80 rounded-full p-3">
                  <img src="/images/play-ico.png" alt="Play" className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;