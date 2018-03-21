import React from "react";
import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
        
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    

    addFish = fish => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({ fishes });
    };
    updateFish = (key, updatedFish) => {
        //1. Take a copy of the current state
        const fishes = {...this.state.fishes };
        // 2. update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({ fishes });

    }

    deleteFish = key => {
        //1. tae a copy of state
        const fishes = {...this.state.fishes};
        //2. update the state
        fishes[key] = null;
        //3. update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        //1. Take a copy of state
        const order = {...this.state.order };
        //2. either add to the order, o rupdate the number in our order
        order[key] = order[key] + 1 || 1;
        //3. Call setstate to update our state oject
        this.setState({ order });
    }

    removeFromOrder = key => {
        //1. Take a copy of state
        const order = {...this.state.order };
        //2. remove that item from order
        delete order[key];
        //3. Call setstate to update our state oject
        this.setState({ order });
    };

render() {
    return (
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
        <ul className="fishes">
        {Object.keys(this.state.fishes).map(key => 
            <Fish 
            key={key} 
            index={key}
            details={this.state.fishes[key]} 
            addToOrder={this.addToOrder}/>)}
        </ul>
        </div>
        <Order 
        fishes={this.state.fishes} 
        order={this.state.order} 
        removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
        addFish={this.addFish} 
        updateFish={this.updateFish}
        deleteFish={this.deleteFish}
        loadSampleFishes={this.loadSampleFishes}
        fishes={this.state.fishes}
        storeId={this.props.match.params.storeId}
        />
        </div>
    )
}
}

export default App;