CC.ImageThumb = React.createClass({
	getThumbImageUrl(publicId) {
		return ($.cloudinary.url(publicId,{
			width: 100,
			height: 100,
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
								<img src={this.getThumbImageUrl(this.props.publicId)} className="ui small image" />
							</div>
							<div className="hidden content">
								<div className="ui mini buttons">
									<button className="ui positive button" onClick={this.showLargeImage}>View</button>
									<div className="or"></div>
									<button className="ui negative button" data-id={this.props.publicId} onClick={this.props.onImageRemoval}>Remove</button>
								</div>
							</div>
						</div>
			</div>
	}
});