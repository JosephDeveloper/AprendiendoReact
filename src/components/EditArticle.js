import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import Swal from 'sweetalert2'
import axios from 'axios'
import Global from './Global'
import Sidebar from './Sidebar'
import imageDefault from '../assets/images/image-not-found.png'

class EditArticle extends Component {
    
    articleId = null

    constructor (props) {
        super(props)
        this.articleId = this.props.match.params.id        
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        })        
    }

    componentWillMount = () => {
        this.getArticle(this.articleId)
    }

    url = Global.url


    titleRef = React.createRef()
    contentRef = React.createRef()

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })

        this.validator.showMessages()
        this.forceUpdate()
    }

    getArticle = (id) => {
        axios.get(this.url+'article/'+id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    saveArticle = (e) => {
        e.preventDefault()

        this.changeState()

        if(this.validator.allValid()){
            axios.put(this.url+'article/'+this.articleId, this.state.article)
                .then(res => {
                    if(res.data.article){
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        })
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Articulo editado',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        //Subir imagen
                        if(this.state.selectedFile !== null){
                            
                            var articleId = this.state.article._id
                            
                            const formData = new FormData()
                            
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            )
    
                            axios.post(this.url+'upload-image/'+articleId, formData)
                                .then(res => {
                                    if(res.data.article){
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    }else{
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        })
                                    }
                                })
                        }else{
                            this.setState({
                                status: 'success'
                            })
                        }
                    }else{
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        }else{
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages()
            this.forceUpdate()
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render(){
        if(this.state.status === 'success'){
            return (
                <Redirect to={'/blog'}/>
            )
        }

        var article = this.state.article
        console.log(article)

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} defaultValue={article.title}/>

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef} onChange={this.changeState} defaultValue={article.content}/>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {article.image != null ? (
                                        <img src={this.url+'get-image/'+article.image} alt={article.title} className="thumb"/>
                                    ) : (
                                        <img src={imageDefault} alt="Articulo" className="thumb"/>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success"/>
                        </form>                    
                    }

                    {
                        !this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }
                </section>
                <Sidebar/>
            </div>
        )
    }
}

export default EditArticle