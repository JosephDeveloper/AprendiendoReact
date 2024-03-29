import React, {Component} from 'react'
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'

class Search extends Component{
    render(){

        var searched = this.props.match.params.search

        return(
            <div id="search">
                <Slider tit={"Busqueda: "+searched} size="slider-small"/>
                <div className="center">
                    <div id="content">
                        {/* Articulos del API */}
                        <Articles search={searched}/>
                    </div>
                </div>
                <Sidebar blog="true"/>
            </div>
        )
    }
}

export default Search