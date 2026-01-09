interface SpotifyEmbedProps {
  albumId?: string;
  className?: string;
}

export default function SpotifyEmbed({
  albumId = '1pmzfDLlQAYD1qQKuqGgEg', // Philophobia EP
  className = '',
}: SpotifyEmbedProps) {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />
    </div>
  );
}






