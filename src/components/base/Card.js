import React from 'react';


class Card extends React.Component {

  render = () => {
    const backgroundColor = this.props.backgroundColor || "white";
    return (
      <div className={ "card shadow mb-2" + (this.props.active ? " active" : "") } onClick={ this.props.onClick }>
        {
          this.props.title &&
            <div className={ "card-header bg-" + backgroundColor }>
              { this.props.title }
            </div>
        }
        <div className="card-body">
          { this.props.children }
        </div>
      </div>
    );
  }

}

export default Card;
