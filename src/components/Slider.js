import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Slider extends Component{
    render(){
        return(
            <div id="slider" className={this.props.size}>
                <h1>{this.props.tit}</h1>
                
                    {this.props.btn &&
                        <Link to={"/"} className="btn-white">{this.props.btn}</Link>
                    }
            </div>
        )
    }
}

export default Slider