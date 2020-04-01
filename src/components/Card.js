import React from 'react';

function Card ({ name }) {
    return (
        <div className="card">
            <img src={name} />
        </div>
    );
};

export default Card;