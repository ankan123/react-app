import React, { Component } from 'react'
import '../App.css';

export class Items extends Component {

constructor(props){
   super(props);

   this.state = {
    items: [],
    isLoaded: false,
    search: '',
   }
}

componentDidMount(){
    fetch('https://cors-anywhere.herokuapp.com/https://ace.qtstage.io/api/v1/collections/entertainment')
    .then(res => res.json())
    .then(json => {
        this.setState({
            isLoaded: true,
            items: json.items,
        })
    });
}

updateSearch(e){
    this.setState({ search: e.target.value });
}


    render() {
        var {isLoaded,items,search} = this.state;
        
        const filteredItems = items.filter(item =>{
            return item.story.headline.toLowerCase().includes( search.toLowerCase() )
        })

        if(!isLoaded){
            return (
                <div className="loading">
                    <span>Loading...</span>
                </div>
            )
        }
        else{
            return (
                <div className="items"> 
                    <div className="card">
                        <div className="card-body">
                            <div className="search-box">
                        <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-lg"><i className="fa fa-search fa-lg" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Search..." value={this.state.search} onChange={this.updateSearch.bind(this)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </div> 

                    <div className="row row-cols-sm-4">
                            {filteredItems.map(item => (
                                <div className="col" key={item.id}>
                                    <div className="card card-item">
                                        <div className="card-header">
                                            <h6 className="card-title text-center">{item.story.headline.substring(0,26)}</h6>                               
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text slug">{item.story.slug}</p> 
                                            <p className="card-text text-right"> - {item.story.authors[0].name}</p> 
                                        </div>
                                        <div className="card-footer">
                                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                                            <p className="card-text text-right">Status: {item.story.status}</p> 
                                        </div>        
                                    </div>
                                </div> 
                            ))};  
                    </div>  
                        </div>
                    </div>                
                </div>
            );
        }
        
    }
}

export default Items
