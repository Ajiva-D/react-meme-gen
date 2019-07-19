import React, { Component } from "react";
//import ReactDom from "react-dom";

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			topText: "",
			bottomText: "",
			randomImage: "http://i.imgflip.com/1bij.jpg",
			allMemeImgs: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}
	handleSubmit(event) {
		event.preventDefault();
		const random = Math.floor(Math.random() *this.state.allMemeImgs.length)
		const meme = this.state.allMemeImgs[random].url;
		this.setState({randomImage : meme})
	}
	componentDidMount() {
		const api = "https://api.imgflip.com/get_memes";
		fetch(api)
			.then(response => response.json())
			.then(res => {
				const { memes } = res.data;
				this.setState({ allMemeImgs: memes });
			});
	}
	render() {
		return (
			<div>
				<form className="meme-form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="topText"
						value={this.state.topText}
						placeholder="Top Text"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="bottomText"
						value={this.state.bottomText}
						placeholder="Bottom Text"
						onChange={this.handleChange}
					/>
					<button>Generate</button>
				</form>

				<div className="meme">
					<img src={this.state.randomImage} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</div>
		);
	}
}

export default MemeGenerator;
