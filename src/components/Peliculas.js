import React, {Component} from 'react'
import Pelicula from './Pelicula'
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component{
    state = {
        peliculas: [
            {
                titulo: 'Batman',
                image: 'https://as.com/meristation/imagenes/2020/07/14/noticias/1594714732_417387_1594714761_noticia_normal.jpg'
            },
            {
                titulo: 'Rapido y furioso',
                image: ''
            },
            {
                titulo: 'Chicas peligro',
                image: 'https://images-na.ssl-images-amazon.com/images/I/31KivhkdogL.jpg'
            }
        ],
        nombre: 'Joseph',
        favorita: {}
    }

    cambiarTitulo = () => {
        var { peliculas } = this.state
        //var random = Math.floor(Math.random() * 3)
        peliculas[0].titulo = 'Batvegins'
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("Marcada")
        console.log(indice)
        console.log(pelicula)
        this.setState({
            favorita: pelicula
        })
    }

    /* componentDidMount(){
        alert('Se cargo el componente peliculas')
    } */

    render(){

        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        var favorita

        if(this.state.favorita.titulo){
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        }else{
            favorita = (
                <p>No hay pelicula favorita</p>
            )
        }

        return (
            <React.Fragment>
                <Slider tit="Peliculas" size="slider-small"/>
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de Peliculas</h2>
                        <p>Selección de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
                        </p>
                        {/* Condicion */}
                        {
                            /* this.state.favorita.titulo ? (
                                <p className="favorita" style={pStyle}>
                                    <strong>La pelicula favorita es: </strong>
                                    <span>{this.state.favorita.titulo}</span>
                                </p>
                            ) : (
                                <p>No hay pelicula favorita</p>
                            ) */
                            favorita
                        }
                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula 
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFav={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar blog="true"/>
                </div>
            </React.Fragment>
        )
    }
}

export default Peliculas