import React from 'react';

const GifList = ({gifList}) => {
    return (
        <div className="gif-grid">
            {gifList.map((item, index) => (
                <div className="gif-item" key={index}>
                    <img src={item.gifLink} alt={''} />
                </div>
            ))}
        </div>
    )
}

export default GifList;