// src/app.jsx

import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchData} from '../../actions/fetchdata';
import { Button } from 'react-bootstrap';
import './cakelister.css';


// stateless functional container component

class CakeListerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adding: {
                title: "",
                desc: "",
                image: "",
                isValid: true
            },
            selected: {
                title: "",
                desc: "",
                image: ""
            }
        }
    }

    componentDidMount() {
        this.props.fetchData();
    }

    renderCards(cakesData) {

        let cake = '<h1>No Data </h1>';
        if (cakesData && cakesData.fetchedData && cakesData.items) {
            cake = cakesData.items.map((item, index) =>
                <li className="media" key={index.toString()}>
                    <a href="#" className="cake__item_link" onClick={(ev) => this.handleClick(ev,index)}>
                        <img className="d-flex mr-3 img-thumbnail" style={{maxWidth: "10%"}} src={item.image}
                             alt={item.title}/>
                        <div className="media-body">
                            <h5 className="mt-0">{item.title}</h5>
                            {item.desc}
                        </div>
                    </a>
                </li>
            )
        }

        return (<ul className="list-unstyled cake">{cake}</ul>);
    }

    renderEdit(){
        let markup;

        //if (this.state.selected) {
            markup = (
                <div>

                    <h2>Edit</h2>
                    <div className="form-group row">
                        <label htmlFor="edit-title" className="col-2 col-form-label">Title</label>
                        <div className="col-10">
                            <input className="form-control" type="text" value={this.state.selected.title} onChange={(ev) => this.handleEdit(ev, 'title')}
                                   id="edit-title"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="edit-desc" className="col-2 col-form-label">Description</label>
                        <div className="col-10">
                            <input className="form-control" type="text" value={this.state.selected.desc} onChange={(ev) => this.handleEdit(ev, 'desc')}
                                   id="edit-desc"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="edit-image" className="col-2 col-form-label">Image</label>
                        <div className="col-10">
                            <input className="form-control" type="text" value={this.state.selected.image} onChange={(ev) => this.handleEdit(ev, 'image')}
                                   id="edit-image"/>
                        </div>
                    </div>

                    <h2>Add</h2>
                    <form onSubmit={(ev) => {this.handleSubmit(ev)}}>
                    <div className="form-group row">
                        <label htmlFor="add-title" className="col-2 col-form-label">Title</label>
                        <div className="col-10">
                            <input className="form-control" type="text" id="add-title" defaultValue={this.state.adding.title} onChange={(ev) => this.validateAdd(ev, 'title')}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="add-desc" className="col-2 col-form-label">Description</label>
                        <div className="col-10">
                            <input className="form-control" type="text" id="add-desc" onChange={(ev) => this.validateAdd(ev, 'desc')}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="add-image" className="col-2 col-form-label">Image</label>
                        <div className="col-10">
                            <input className="form-control" type="text" id="add-image" onChange={(ev) => this.validateAdd(ev, 'image')}/>
                        </div>
                    </div>
                    <Button type="submit" bsStyle="primary">Add Cake</Button>
                    </form>

                </div>
            )
        //}

        return (<div>{markup}</div>);
    }

    handleClick(ev, selectedIndex) {
        ev.preventDefault();
        ev.nativeEvent.preventDefault();
        // update local state
        let selectedItem = this.props.cakes.items[selectedIndex];
        this.setState({selected: selectedItem, selectedIndex: selectedIndex, adding: {...this.state.adding}});
    }

    handleEdit(ev, prop) {
        // Raise an action via redux reducer mapped to a prop
        this.props.editCake(prop, ev.target.value, this.state.selectedIndex);
    }

    validateAdd(ev, prop) {
        // An opportunity to validate input

        if (ev.target.value.length < 1) {
            return;
        }

        // update local state
        let newState = {...this.state};
        newState.adding[prop] = ev.target.value;
        // update local state
        this.setState(newState);

        return true;
   }

    handleSubmit(ev){
        ev.preventDefault();
        ev.nativeEvent.preventDefault();

        // could have used redux here if the app gets any bigger
        this.props.addCake(
            {
                title: this.state.adding.title,
                desc: this.state.adding.desc,
                image: this.state.adding.image
            }
        );
    }

    render() {

        const { cakes } = this.props;

        let cards = this.renderCards(cakes);
        let edit = this.renderEdit();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        {cards}
                    </div>
                    <div className="col-lg-6">
                        {edit}
                    </div>
                </div>
            </div>
        )
    }

}

// parse the global state and only pass in the state we are interested in to the presentational component

const mapStateToProps = (state) => {
    return {
        cakes: state.cakes
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData()),
        editCake: (prop, value, selectedIndex) => dispatch(
            {type:'EDIT_CAKE',
             userdata: {prop: prop, index: selectedIndex, changedValue: value}
            }),
        addCake: (cake) => dispatch({type: 'ADD_CAKE', userdata: cake})
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CakeListerComponent);
