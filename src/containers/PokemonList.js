import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Infinite from 'react-infinite';
import {Modal} from 'react-bootstrap';
import {fetchList,fetchDetails} from '../actions/index';
import './pokemon-list.css';

class PokemonList extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            open:false,
            pokemonDetails:[],
            selectedPokemon: null,
        };
        this.handleClick=this.handleClick.bind(this);
        this.show=this.show.bind(this);
    }   

    // Leverage async function or generators
    getPokemonData = async () => {
        try {
            let pokemonDetails=[];
            setTimeout(()=>this.setState({loading:false}),3000);
            const pokemonList = await this.props.fetchList();
        
            pokemonList.payload.data.results.forEach(async (p) =>{
            const pokemonDetailsResponse = await this.props.fetchDetails(p.name);
                pokemonDetails.push({
                    name:p.name,
                    weight:pokemonDetailsResponse.payload.data.weight,
                    ability:pokemonDetailsResponse.payload.data.abilities[0].ability.name,
                    images:pokemonDetailsResponse.payload.data.sprites.front_default,
                });
                });
            this.setState({pokemonDetails});
        } catch (e) {
            console.log('something went wrong', e);
        }        
    }

	componentDidMount(){
		this.getPokemonData();
	}

	handleClick(){
		this.setState({selectedPokemon:null});
	}

	show(event, selectedPokemon){
	    this.setState({ selectedPokemon })
	}
    
  
    render() {
	    const {loading,pokemonDetails, selectedPokemon }=this.state;
        return (
            <div className="container">
				{loading ? <h3>Loading... Click on Pokemon to see details</h3>:
                    <div className="grid">
					  {selectedPokemon ? (
						//   to display single pokemon detail
                        <div className="display-card">
                            <li>Name:{selectedPokemon.name}</li>
                            <li><img src={selectedPokemon.images} alt=" "/></li>
                            <li>Weight:{selectedPokemon.weight}</li>
                            <li>Ability:{selectedPokemon.ability}</li>
			    <button className="btn btn-primary"onClick={this.handleClick}>Show All </button>
                        </div>
				// to display list of pokemons
			    ) : pokemonDetails.map((p,i) => {
                        return(
                            <div className="box" key={i} onClick={(e) => this.show(e, p)}>
                                <Infinite containerHeight={200} elementHeight={40} useWindowAsScrollContainer>
                                    <li>Name:{p.name}</li>
                                    <li><img src={p.images} alt=" "/></li>
                                </Infinite>
                             </div> 
		              );
		           })}
                    </div>
                }
            </div>
	    );
    }
}
                
function mapStateToProps(state){ 
	return {pokemon:state.pokemon.list};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchList,fetchDetails},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PokemonList);
