CC.FormElements.FileUpload = React.createClass({
	getValue() {
		return (this.state.imageArray && this.state.imageArray.length > 0) ? this.state.imageArray : null;
	},
	getInitialState() {
		return {
			imageArray: this.props.defValue || [],
			loading: []
		}
	},
	getImageUrl(publicId) {
		return ($.cloudinary.url(publicId,{
			width: 100,
			height: 100,
			crop: 'fill'
		}));
	},
	onChangedEvent(event) {
		let files = event.target.files;
		let self = this;

		let loading = this.state.loading || [];
		for(let a = 0; a < files.length; a ++) {
			loading.push({
				id: Random.id()
			});
		}
		this.setState({
			loading: loading
		});

		Cloudinary.upload(files,{
			folder: 'test'
		}, function(e,r) {
			if(!e) {
				let arrayOfImages = self.state.imageArray;
				arrayOfImages.push(r.public_id);
				let loading = self.state.loading || [];
				self.setState({
					imageArray: _.uniq(arrayOfImages),
					loading: (loading.length > 0) ? loading.pop() : []
				});
			}
		});
		//this.props.onChangedEvent(event);
	},
	render() {
		return <div className="fieldWrap">
			<div className={(this.props.error && this.props.error[this.props.fieldName]) ? "field error" : "field" }>
				<label htmlFor={this.props.fieldName}>
					{this.props.label}
				</label>
				<input
					id={this.props.fieldName}
					ref={this.props.fieldName}
					onChange={this.onChangedEvent}
					className="fileupload"
					multiple
					type="file" />
				{(this.state.imageArray) ? this.state.imageArray.map((id) => {
					return <img key={id} src={this.getImageUrl(id)} />
					}) : null}

				{(this.state.loading && this.state.loading.length > 0) ? this.state.loading.map((item) => {
					console.log(item)
					return <span key={item.id}>Loading</span>
					}) : null}
			</div>
			{(this.props.error && this.props.error[this.props.fieldName]) ?
			<span className="error">
          {this.props.error[this.props.fieldName]}
        </span> : null}
		</div>
	}
});