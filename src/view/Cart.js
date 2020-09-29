import React, { Component }  from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Products from '../assets/products.json';
import Product from '../component/Product';
import ItemCart from '../component/ItemCart';


export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsCart: [],
            total: 0.00
        }
    }

    componentDidMount() {
        
        // Divide price
        Products.products.map((item) => {
            // item.price.partInt = Math.floor(item.price.amount);
            // item.price.partDecimal = Math.round( (item.price.amount - item.price.partInt) * 100 ) / 100;
            item.price.stringAmount = String(item.price.amount).split(".");
        });
        this.setState({
            items: Products.products
        });  
    }

    roundValue = (value) => {
        let roundValue = Math.round( value * 100 ) / 100;

        return roundValue;
    }

    addToCart = (item) => {
        
        let itemsCard = this.state.itemsCart;

        // find item into  itemsCart
        let flagFind = false;
        let total = 0;
        for(let i = 0; i < itemsCard.length ; i++) {
            if(itemsCard[i].id === item.id) {
                itemsCard[i].count = itemsCard[i].count + 1;
                flagFind = true;
            }
            total += itemsCard[i].price.amount*itemsCard[i].count;
        }
       
        if(!flagFind)  {
            item.count = 1;
            itemsCard.push(item);
            total += item.price.amount*1;
        }
        
        this.setState({
            itemsCard: this.state.itemsCart = itemsCard,
            total: this.state.total = this.roundValue(total)
        });
    }

    deleteFromCart =(item) => {

        let itemsCard = this.state.itemsCart;
        let newItems = [];
        let total = 0;
        for(let i = 0; i < itemsCard.length ; i++) {
            if(itemsCard[i].id !== item.id) {
                newItems.push(itemsCard[i]);
                total += itemsCard[i].price.amount*itemsCard[i].count;
            }
        }
       
        this.setState({
            itemsCard: this.state.itemsCart = newItems,
            total: this.state.total = this.roundValue(total)
        });
    }

    render() {

        const { items, itemsCart, total } = this.state;
        return (
            <div className="container">
               <Row>
                   <Col sm={8}>
                        <div className="box-wrap">
                            {items.map((item, idx) => {
                                return(<Product key={item.id} item={item} addItem={this.addToCart}></Product>);
                            })}
                        </div>
                   </Col>
                   <Col sm={4}>
                        <div className="box-cart">
                            <p>Kosarica</p>
                            <div className="cart-items">
                                {itemsCart.length === 0 && 
                                    <p>No hay productos en su carrito de compras.</p>
                                }
                                {itemsCart.map((item, idx) => {
                                    return(<ItemCart key={item.id} item={item} deleteItem={this.deleteFromCart}></ItemCart>);
                                })}
                            </div>
                            
                        </div>
                        <hr></hr>
                        <div className="box-total">
                            <p>Ukupan iznos:</p>
                            <p>{total} kn</p>
                        </div>
                   </Col>
               </Row>
            </div>
        );
    }
}