import React from 'react';

const Form = ({inputValue, onInputChange, sendGif}) => {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                sendGif();
            }}
        >
            <input
                type="text"
                placeholder="Enter gif link!"
                value={inputValue}
                onChange={onInputChange}
            />
            <button type="submit" className="cta-button submit-gif-button">
                Submit
            </button>
        </form>
    )
}

export default Form;