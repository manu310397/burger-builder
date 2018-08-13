import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/checkoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }


    //-----------before redux------------
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let params of query.entries()){
    //         //params will be like ['salad', '1']
    //         if(params[0] === 'price'){
    //             price = params[1];
    //         } else {
    //             ingredients[params[0]] = +params[1];
    //         } 
    //     }
    //     this.setState({ingredients:ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasesRedirect = this.props.purchased?<Redirect to="/" />:null;
            summary = (
                <div>
                    {purchasesRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    component={ContactData} 
                    path={this.props.match.path + '/contact-data'} />

                
                    {/*before redux */}
                {/* <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render= {(props) => <ContactData 
                                    ingredients={this.state.ingredients}
                                    price={this.state.totalPrice}
                                    {...props}/>}/> */}
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings:  state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);