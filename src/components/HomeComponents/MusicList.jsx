import React from 'react';

const embededSpotifyPlayer = (spotifyTrackId) => (
    <iframe 
        src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`} 
        width="100%" 
        height="380" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    />        
)

const MusicList = ({musicList}) => {
    
    return (
        <div className="gif-grid">
            {musicList.map((item, index) => {
                const musicTrackId = item.musicLink.split('/').pop()
                return (
                    <div className="gif-item" key={`music-item-${index}`}>
                        {embededSpotifyPlayer(musicTrackId)}
                    </div>
                )
            })}
        </div>
    )
}

export default MusicList;