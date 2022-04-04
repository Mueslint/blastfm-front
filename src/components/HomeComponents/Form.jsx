import React from 'react';

const Form = ({inputValue, onInputChange, sendMusic, resetMusic}) => {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                sendMusic();
            }}
        >
            <input
                type="text"
                placeholder="Enter spotify music link: https://open.spotify.com/track/4DrUFg8VvQKwzdUL0cGiVe"
                value={inputValue}
                onChange={onInputChange}
            />
            <button type="submit" className="cta-button submit-gif-button">
                Submit
            </button>
            <button className="cta-button reset-gif-button" onClick={resetMusic}>
                Reset
            </button>
        </form>
    )
}

export default Form;