import React, { Component }  from 'react';
import NoImage from '../assets/images/noimage.jpg';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: props.key,
            item: props.item
        }
    }

    additem = (e) =>{
        if(this.props.addItem) {
            this.props.addItem(this.state.item);
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
            <div className="card-product">
                <div className="product">
                    <img src={item.image} onError={e => this.onError(e)}></img>
                </div>
                <div className="title">
                    <p>{item.name}</p>
                </div>
                <div className="price">
                    {item.price.stringAmount[0]}
                    <div class="frac">
                        <span>{item.price.stringAmount[1]}</span>
                        <span class="bottom">{item.price.currency}/{item.price.measureUnit}</span>
                        
                    </div>
                   
                </div>
                
                <div className="button">
                    <button className="btn-add" onClick={e => this.additem(e)}>Agregar</button>
                </div>
            </div>
        );
    }
}