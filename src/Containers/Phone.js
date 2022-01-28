import React from "react";
import { connect } from "react-redux";
import { fetchPhoneById, addPhoneToBasket } from "../actions/Phones";
import { getPhonesById } from "../selectors/Phones";
import R from "ramda";
import BasketCart from "./BasketCart";
import AccountButton from "./AccountButton";
import { Link } from "react-router";

class Phone extends React.Component {
  componentDidMount = () => {
    window.analytics.page("Phone Info");
    this.props.fetchPhoneById(this.props.params.id);
  };

  renderFields = () => {
    const { phone } = this.props;
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        "brand",
        "cpu",
        "camera",
        "size",
        "weight",
        "display",
        "battery",
        "memory",
      ])
    )(phone);
    // console.log("columnFields ", columnFields);
    return columnFields.map(([key, value]) => {
      return (
        <div className="column" key={key}>
          <div className="ab-details-title">
            <p> {key} </p>
          </div>
          <div className="ab-details-info">
            <p> {value} </p>
          </div>
        </div>
      );
    });
  };

  renderContent = () => {
    const { phone } = this.props;
    return (
      <div>
        <div className="thumbnail">
          <div className="col-md-6">
            <img className="img-thumbnail" src={phone.image} alt={phone.name} />
          </div>
          <div className="col-md-6">{this.renderFields()}</div>
        </div>
        <div className="caption-full">
          {/*<h4 className="pull-right">${phone.price}</h4>
          <h2>{phone.name}</h2>
          <p>{phone.description}</p>*/}
        </div>
      </div>
    );
  };

  renderSideBar = () => {
    const { phone, addPhoneToBasket } = this.props;
    return (
      <div>
        <div>
          {/*<p className="lead"> Quick Shop</p>
          <BasketCart />*/}
          <div className="form-group">
            <h1>{phone.name}</h1>
            <h2>${phone.price}</h2>
            <p>{phone.description}</p>
          </div>
        </div>
        <Link to="/" className="btn btn-info btn-block">
          Back to Store
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => addPhoneToBasket(phone)}
        >
          Add To Cart
        </button>
      </div>
    );
  };

  render() {
    // console.log(this.props.phone);
    const { phone } = this.props;
    return (
      <div className="view-container">
        
        {/* Website Header */}
        <div className="web-header">
                <div className="row" style={{margin: '20px'}}>
                    <div className="col-md-8">
                    <img className="img-logo" src="/uploads/phone123.png" 
                    alt="Apple iPhone 5c"></img>
                    <h1>The Phone Shop</h1>
                    </div>
                    
                    <div className="header-cart col-md-2">
                        <BasketCart />
                    </div>
    
                    <div className="header-account col-md-2">
                        <AccountButton />
                    </div>


                </div>
          </div>



        <div className="container">
          <div className="col-md-8">{phone && this.renderContent()}</div>
          <div className="col-md-4">{phone && this.renderSideBar()}</div>
        </div>
      </div>
    );
  }
}

// export default Phone;
const mapDispatchtoProps = (dispatch) => ({
  fetchPhoneById: (id) => {
    dispatch(fetchPhoneById(id));
  },
  addPhoneToBasket: (phone) => {
    dispatch(addPhoneToBasket(phone.id));
    // track event for adding product to basket
    analytics.track('Product Added',
      {
        name: phone.name,
        price: phone.price,
        cpu: phone.cpu,
        camera: phone.camera,
        size: phone.size,
        weight: phone.weight,
        display: phone.display,
        battery: phone.battery,
        memory: phone.memory,
      });
  },
});

const mapStateToProps = (state) => ({
  phone: getPhonesById(state, state.PhonePage.id),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Phone);
