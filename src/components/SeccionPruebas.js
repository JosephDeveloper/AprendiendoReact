import React, {Component} from 'react'
import MiComponente from './MiComponente'

class SeccionPruebas extends Component{

    /* constructor(props){
        super(props)
        this.state = {
            contador: 0
        }
    } */

    state = {
        contador: 0
    }

    sumar = () => {
        //this.contador = this.contador+1
        //this.state.contador = this.state.contador + 1
        this.setState({
            contador: (this.state.contador + 1)
        })
    }

    restar = () => {
        //this.contador = this.contador-1
        //this.state.contador = this.state.contador - 1
        this.setState({
            contador: (this.state.contador - 1)
        })
    }

    render(){
        return (
            <section id="content">
                <h2 className="subheader">Últimos articulos</h2>
                <section className="componentes">
                <MiComponente/>
                </section>
                <p>
                    Contado: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar}/>
                    <input type="button" value="Restar" onClick={this.restar}/>
                </p>
            </section>
        )
    }
}

export default SeccionPruebas