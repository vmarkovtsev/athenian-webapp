import React from 'react';

export default ({ backgroundColor, title, active, onClick, children }) => {
  const background = backgroundColor || "white";

  return (
    <div className={"card shadow mb-2" + (active ? " active" : "")} onClick={onClick}>
      {
        title &&
        <div className={"card-header bg-" + background}>
          {title}
        </div>
      }
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};
