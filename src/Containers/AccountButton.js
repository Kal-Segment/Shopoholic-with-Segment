import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../selectors/Profile";
import { Link } from "react-router";

class AccountButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
      isRegistered: props.isRegistered,
      username: props.username,
      firstName: props.firstName,
      lastName: props.lastName,
    };
  }

  render() {
    return (
      <div className="itemButton">
        {!this.state.isLoggedIn && (
        <Link to="/profile" id="dLabel">
          <button style={{
            width:'60%', 
            'borderRadius': '4px', 
            'backgroundColor': '#101940', 
            border: '4',
            color: "white",
            'marginTop': '160px',
            }}
            className="btn btn-default btn-block"
          >
          <span className="glyphicon glyphicon-user" /> 
          
            {(!this.state.isLoggedIn 
              && !this.state.isRegistered) 
              ? ' Register' : ' Sign In'}

          </button>
        </Link>
        )}

        {this.state.isLoggedIn && (
        <div>
          Hi {this.state.firstName} {this.state.lastName}
        </div>
        )}

      </div>
    );
  }
}

const mapStateToProps = (state) => getProfile(state);

export default connect(mapStateToProps)(AccountButton);
