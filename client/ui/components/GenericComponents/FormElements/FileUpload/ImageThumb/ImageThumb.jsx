CC.ImageThumb = React.createClass({
	getThumbImageUrl(publicId) {
		return ($.cloudinary.url(publicId,{
			width: 500,
			height: 500,
			crop: 'fill'
		}));
	},
	showLargeImage(event) {
		event.preventDefault();
		let url = $.cloudinary.url(this.props.publicId);
		sImageBox.open(url);
	},
	onImageRemoval(event) {
		event.preventDefault();
		this.props.onImageRemoval(event);
	},
	render () {
		return <div className="four wide column">
						<div className="ui move up reveal">
							<div className="visible content">
								<img src={this.getThumbImageUrl(this.props.publicId)} className="ui fluid image" />
							</div>
							<div className="hidden content">
								<button className="fluid ui positive button" onClick={this.showLargeImage}>View</button>
								<br />
								<button className="fluid ui primary button" data-id={this.props.publicId} onClick={this.props.onMakePrimary}>Make primary</button>
								<br />
								<button className="fluid ui negative button" data-id={this.props.publicId} onClick={this.props.onImageRemoval}>Remove</button>
						</div>
						</div>
			</div>
	}
});