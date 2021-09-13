import React from "react";
import { connect } from "react-redux";
import { fetchPhones, fetchCategories } from "../actions/Phones";
import { getPhones } from "../selectors/Phones";
import { Link } from "react-router";
import R from "ramda";
import { addPhoneToBasket } from "../actions/Phones";

class Phones extends React.Component {
  componentDidMount() {
    window.analytics.page("Phones");
    this.props.fetchPhones();
    this.props.fetchCategories();
  }

  renderPhone = (phone, index) => {
    const { addPhoneToBasket } = this.props;
    const shortDesc = `${R.take(60, phone.description)}...`;
    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
        <div className="thumbnail">
          <img className="img-thumbnail" src={phone.image} alt={phone.name} />
        </div>
        <div className="caption">
          <h4 className="pull-right">${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p> {shortDesc}</p>
          <p className="itemButton">
            <button
              className="btn btn-primary"
              onClick={() => addPhoneToBasket(phone)}
            >
              Buy Now
            </button>

            <Link 
              to={`/Phones/${phone.id}`} 
              className="btn btn-default"
              onClick={() => moreInfo(phone)}
            >
              More Info
            </Link>
          </p>
        </div>
      </div>
    );
  };

  render() {
    const { phones } = this.props;
    return (
      <div>
        <div className="books row">
          {phones.map((phone, index) => {
            return this.renderPhone(phone, index);
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPhones: () => dispatch(fetchPhones()),
  addPhoneToBasket: (phone) => {
    dispatch(addPhoneToBasket(phone.id))
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
        category: "Products",
        label: phone.name,
      });   
  },
  fetchCategories: () => dispatch(fetchCategories()),
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state, ownProps) => ({
  phones: getPhones(state, ownProps),
});

function moreInfo(phone) {
  // call Segment track() event for product clicked
  analytics.track("Product Clicked", {
    name: phone.name,
    brand: phone.brand,
    category: "Products",
    label: phone.name,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Phones);
