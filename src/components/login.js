import React from "react"
import bs from "../styles/bootstrap.module.css"


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roll : "",
            isLoggedIn: false
        };

    }
    handleClick = () => {
        this.props.next(this.state.roll);
    }
    rollSet = ({target}) => {
        this.setState({
            roll: target.value
        });
    }
    render() {
  
      return (
          <div id ="loginScreen">
            <div className={"vertical-center d-flex justify-content-center align-items-center rollPop"}>
                <center>
                    <div className={[bs.formGroup, bs.w50, "login"].join(' ')}> 
                        <br /><h3>JU Connect</h3>
                        <p>Enter your 12 digit Roll Number</p>
                        <div className = {bs.inputGroup}>
                            <input className={[bs.formControl,"rollInput"].join(' ')} placeholder="Roll Number" onChange={ this.rollSet }  value={this.state.roll} />
                            <div className={bs.InputGroupAppend}>
                                <button className={[bs.btn,bs.btnPrimary,"goButton"].join(' ')} type="submit" onClick = { this.handleClick}>GO</button> 
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        </div>
      );
    }
  }

 export default Login