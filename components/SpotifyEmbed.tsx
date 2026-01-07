interface SpotifyEmbedProps {
  albumId?: string;
  className?: string;
}

export default function SpotifyEmbed({
  albumId = '4m1kJeC4FApGDstuNTLR1W',
  className = '',
}: SpotifyEmbedProps) {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
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

