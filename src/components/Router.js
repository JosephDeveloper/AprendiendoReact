import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import MiComponente from './MiComponente';
import Error from './Error';
import Header from './Header';
import Footer from './Footer';
import Home from './Home'
import Blog from './Blog'
import Peliculas from './Peliculas';
import Formulario from './Formulario';
import Search from './Search'
import Article from './Article';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';

class Router extends Component {
    render () {
        return (
            <BrowserRouter>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/blog" component={Blog}/>
                        <Route exact path="/blog/busqueda/:search" component={Search}/>
                        <Route exact path="/redirect/:search" render={(props) => {
                            var search = props.match.params.search
                            return (
                                <Redirect to={'/blog/busqueda/'+search}/>
                            )
                        }}/>
                        <Route exact path="/blog/articulo/:id" component={Article}/>
                        <Route exact path="/blog/crear" component={CreateArticle}/>
                        <Route exact path="/blog/editar/:id" component={EditArticle}/>
                        <Route exact path="/formulario" component={Formulario}/>
                        
                        <Route exact path="/peliculas" component={Peliculas}/>
                        <Route exact path="/segunda-ruta" component={MiComponente}/>
                        <Route exact path="/pagina-1" render={() => (
                            <h1>Pagina sin componente</h1>
                        )}/>

                        <Route exact path="/pruebas/:nombre/:apellido?" render={(props) => {
                            var nombre = props.match.params.nombre
                            var apellido = props.match.params.apellido
                            return (
                                <div id="content">
                                    <h2 className="subheader">Pagina de pruebas</h2>
                                    <h2>
                                    {nombre && !apellido &&
                                        nombre
                                    }
                                    {nombre && apellido &&
                                        nombre + ' ' + apellido
                                    }
                                    </h2>
                                </div>
                            )
                        }}/>

                        <Route component={Error}/>
                    </Switch>
                <div className="clearfix"></div>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default Router