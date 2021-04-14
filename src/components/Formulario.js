import React, {Component} from 'react'
import Sidebar from './Sidebar';

class Formulario extends Component{
    
    nombreRef = React.createRef()
    apellidoRef = React.createRef()
    biografiaRef = React.createRef()
    generoHRef = React.createRef()
    generoMRef = React.createRef()
    generoORef = React.createRef()

    state = {
        user: {}
    }

    recibirFormulario = (e) => {
        e.preventDefault()

        var genero = 'hombre'
        
        if(this.generoHRef.current.checked){
            genero = this.generoHRef.current.value
        }else if(this.generoMRef.current.checked){
            genero = this.generoMRef.current.value
        }else{
            genero = this.generoORef.current.value
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            biografia: this.biografiaRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        })

        console.log(user)
    }

    render(){      
        return(
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>

                        {this.state.user.nombre &&
                            <div>
                                <p>
                                    Nombre: {this.state.user.nombre}
                                </p>
                            </div>
                        }

                        <form action="" className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" name="apellido" ref={this.apellidoRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.biografiaRef}></textarea>
                            </div>
                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHRef}/>Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMRef}/>Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoORef}/>Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success"/>
                        </form>
                    </div>
                </div>
                <Sidebar blog="true"/>
            </div>
        )
    }
}

export default Formulario