import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=c6f12b8149eb423391c453f55a2494dc";

class NewsDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                source: { id:'Unknown', name: null },
                author: null,
                title: null,
                description: null,
                url: null,
                urlToImage: null,
                publishedAt: null,
                content: null
            },
        }
    }

    componentDidMount() {
        // this.props.history.push(`/dashboard/news/:${this.props.match.params}`);
        console.log("id is: ");
        const { id } = this.props.match.params;
        console.log(id)
        const { data } = this.props.location.state;
        console.log(data)

        let load = data.find((e) => {
            return (e.title === id)
        })
        console.log("data is:" + load.source.name);
        console.log(this.props)
        
        console.log(data);

        this.setState({ item: {
            source: { id: load.source.id, name: load.source.name },
            author: load.author,
            title: load.title,
            description: load.description,
            url: load.url,
            urlToImage: load.urlToImage,
            publishedAt: load.publishedAt,
            content: load.content
        }})
        
        console.log(this.state.item)
    }
    render() {
        return (
            <div>
     
        <h1 className="display-3">{this.state.item.source.name}</h1>
        <p className="lead">Presented by:{this.state.item.source.id}</p>
        <hr className="my-2" />
        <p>Author: {this.state.item.author}</p>
        <p>Title:{this.state.item.title}</p>
        <p>Description:{this.state.item.description}</p>
        <p>Source: <a href={this.state.item.url}>{this.state.item.source.name}</a></p>
        <p>PublishedAt: {this.state.item.publishedAt}</p>
        <hr className="my-2" />
        <p>Content: {this.state.item.content}</p>
     
    </div>
        );
    }
    
}
export default NewsDescription;