import React, {Component} from 'react'
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'

class Blog extends Component{
    render(){
        return(
            <div id="blog">
                <Slider tit="Blog" size="slider-small"/>
                <div className="center">
                    <div id="content">
                        {/* Articulos del API */}
                        <Articles/>
                    </div>
                </div>
                <Sidebar blog="true"/>
            </div>
        )
    }
}

export default Blog