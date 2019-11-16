import React from 'react';
import './App.css';
import styled, { keyframes } from 'styled-components';
import { rubberBand } from 'react-animations';
import { CSSTransition } from "react-transition-group";

const fadeInAnimation = keyframes`${rubberBand}`;
const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation};
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums : [],
            photos :[],
            appearPhoto: true
        };
    }
    photosAppear = () => {
        this.setState({
            appearPhoto: !this.state.appearPhoto
        })
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(albums => {
                this.setState({albums});
            });
    }
    getPhotos(event) {
        this.setState({photos: []});
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${event.target.value}`)
            .then(res => res.json())
            .then(photos => {
                this.setState({photos});
            });
    }
    render() {
    return (
        <div className="App">
            <FadeInDiv><h1>Gallery App 🎞</h1></FadeInDiv>
            <select className="albums" onChange={this.getPhotos.bind(this)} onSelect={() => this.photosAppear()}>>
                <option>Choose your favorite album 💗️</option>
                    {this.state.albums.map(album => {
                        return <option value={album.id} key={album.id}>
                            {album.title}
                        </option>
                    })}
            </select>
            <br/>
            <br/>
            <br/>
                <div className="photos">
                    {this.state.photos.map(photo => {
                        return <CSSTransition
                            in={true}
                            appear={true}
                            timeout={1000}
                            classNames="fade">
                            <img src={photo.thumbnailUrl} alt={photo.title} key={photo.id}/>
                        </CSSTransition>
                    })}
                </div>
        </div>
    );
  }

}

export default App;
