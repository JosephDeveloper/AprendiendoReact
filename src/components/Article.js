import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Global from './Global'
import Sidebar from './Sidebar'
import Moment from 'react-moment'
import 'moment/locale/es'
import imageDefault from '../assets/images/image-not-found.png'

class Article extends Component {

    url = Global.url

    state = {
        article: false,
        status: null
    }

    componentWillMount(){
        this.getArticle()
    }

    getArticle = () => {
        var id = this.props.match.params.id
        axios.get(this.url+'article/'+id)
            .then(res => {
                this.setState({
                  article: res.data.article,
                  status: 'success'  
                })
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                })
            })
    }

    deleteArticle = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Deseas eliminar el articulo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(this.url+'article/'+id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'deleted'
                })
            })
            Swal.fire(
            'Eliminado!',
            'El articulo fue eliminado',
            'success'
            )
        }
        })        
    }

    render() {
        if(this.state.status === 'deleted'){
            return (
                <Redirect to='/blog' />
            )
        }

        var article = this.state.article
        return (
            <div className="center">
                <section id="content">
                    {
                        this.state.article &&

                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image != null ? (
                                    <img src={this.url+'get-image/'+article.image} alt={article.title}/>
                                ) : (
                                    <img src={imageDefault} alt="Articulo"/>
                                )
                                }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>
                                    {article.date}
                                </Moment>
                            </span>
                            <p>{article.content}</p>

                            <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>
                            <button to={'/'} className="btn btn-danger" onClick={() => {
                                this.deleteArticle(article._id)
                            }}>Eliminar</button>

                            <div className="clearfix"></div>
                        </article>
                    }

                    {
                        !this.state.article && this.state.status === 'success' &&
                        
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>No articulo para mostrar</p>
                        </div>
                    }

                    {
                        this.state.status === null &&
                        
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere un momento</p>
                        </div>
                    }
                </section>
                <Sidebar/>

            </div>
        )
    }
}

export default Article