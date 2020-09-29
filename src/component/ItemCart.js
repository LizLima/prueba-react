import React, { Component }  from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoImage from '../assets/images/noimage.jpg';

export default class ItemCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: props.key,
            item: props.item
        }
    }
    

    roundValue = (value) => {
        let roundValue = Math.round( value * 100 ) / 100;

        return roundValue;
    }

    delete = (e) => {
        console.log("cik")
        if(this.props.deleteItem) {
            this.props.deleteItem(this.state.item);
        }
    }

    /**
     * Display noimage if the original image is not available.
     * @param {*} e 
     */
    onError = (e) => {
        e.target.onerror = null; 
        e.target.src=NoImage;
    }

      
    render() {
        const { item } = this.state;
        
        return (
            <div className="card-item">
                <div className="delete-icon" onClick={e => this.delete(e)}>
                    <p>X</p>
                </div>
                <div className="image">
                    <img src={item.image} onError={e => this.onError(e)}></img>
                </div>
                <div className="title">
                    <p>{item.count} x {item.name}</p>
                </div>
                <div className="total">
                    <p>Ukupno: {this.roundValue(item.price.amount*item.count)}</p>
                </div>
            </div>
        );
    }
}