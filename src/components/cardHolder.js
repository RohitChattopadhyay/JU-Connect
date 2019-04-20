import React from "react"

class Card extends React.Component {
    render() {
        const props = this.props;
       return (
           <label htmlFor={props.slug}>
           <input id={props.slug} name = "channelBox" value={props.slug} type="checkbox"/>
                <div className={`card flex-card`}>
                    <h6>{props.name}</h6>
                    <small>{props.slug}</small>
                </div>
            </label>
        );
    }
 }
 export default Card