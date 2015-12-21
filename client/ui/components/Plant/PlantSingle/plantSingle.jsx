CC.PlantSingle = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		if(this.props.docId){
			var handlePlant = Meteor.subscribe('plant', this.props.docId);
			var handlePlantTypes = Meteor.subscribe('plantTypes');
			var handlePlantArea = Meteor.subscribe('plantAreas');
			var handleGrowingMedia = Meteor.subscribe('growingMedia');
			var handleNutrientMixes = Meteor.subscribe('nutrientMixes');
			var handlePHValues = Meteor.subscribe('phValues');
		}

		return {
			plant: this.props.docId && Inventory.findOne(this.props.docId),
			plantFamilies: PlantFamilies.find().fetch(),
			plantAreas: PlantAreas.find().fetch(),
			growingMedia: GrowingMedia.find().fetch(),
			nutrientMixes: NutrientMixes.find().fetch(),
			phValues: PHValues.find().fetch(),
		}
	},
	getInitialState() {
		return {}
	},
	getPlantName() {
		if( this.data.plant ){
			return this.data.plant.plantName;
		}
	},
	getPlantFamily() {
		if( this.data.plant ){
			let self = this;
			let plantType = _.find( self.data.plantFamilies, function (family){
				return family._id === self.data.plant.plantType;
			});
			if( plantType ){
				return plantType.name;   
			}
		}
	},
	getPlantMainImage () {
		if(this.data.plant && this.data.plant.plantImage && this.data.plant.plantImage.length > 0) {
			return <img src={$.cloudinary.url(this.data.plant.plantImage[0])} />;
		} else {
			return <div className="plant-single__image"></div>;
		}
	},
	getPlantSecondaryImages () {
		if(this.data.plant && this.data.plant.plantImage && this.data.plant.plantImage.length > 1) {
			let plantArray = this.data.plant.plantImage.slice(1);
			return plantArray;
		}
	},
	getImage(publicId) {
		console.log(publicId)
		return $.cloudinary.url(publicId,{
			width: 100,
			height: 100,
			crop: 'fill'
		});
	},
	getPlantArea() {
		if( this.data.plant ){
			let self = this;
			let plantArea = _.find( self.data.plantAreas, function (area){
				return area._id === self.data.plant.areaId;
			});
			if( plantArea ){
				return plantArea.name;   
			}
		}
	},
	getPlantDate() {
		if( this.data.plant ){
			return "Planted " + moment( this.data.plant.datePlanted ).format( 'MMM D, YYYY');
		}
	},
	getPlantGrowingMedium() {
		if( this.data.plant ){
			let growingMediumId = this.data.plant.growingMediumId;
			if( growingMediumId !== null ){
				return growingMediumId;
			} else {
				return <span>No growing medium selected</span>;
			}
		}
	},
	getPlantNutrients() {
		if( this.data.plant ){
			let nutrientId = this.data.plant.nutrientId;
			if( nutrientId !== null){
				return nutrientId;
			} else {
				return <span>No nutrients selected</span>
			}
		}
	},
	getPlantPh() {
		if( this.data.plant ){
			let phId = this.data.plant.phId;
			if( phId !== null){
				return phId;
			} else {
				return <span>No PH data recorded</span>
			}
		}
	},
	render() {
		let images = this.getPlantSecondaryImages();
		let self = this;
		return <div className="plant-single">
				<div className="ui grid container">
					<div className="eight wide column">
						<div className="plant-single__image-box">
							{ this.getPlantMainImage() }
						</div>
						{(images && images.length > 0) ? images.map(function (item) {
							return <img key={item} src={self.getImage(item)}/>
							}) : null}
					</div>
					<div className="eight wide column">
						<div className="plant-single__name">
							<h3 className="ui header">{ this.getPlantName() }</h3>
						</div>
						<div className="plant-single__family">{ this.getPlantFamily() }</div>
						<div className="plant-single__area">{ this.getPlantArea() }</div>
						<div className="plant-single__date-planted">{ this.getPlantDate() }</div>
					</div>
					<div className="sixteen wide column">
						<div className="plant-single__growing-medium" >{ this.getPlantGrowingMedium() }</div>
						<div className="plant-single__nutrient">{ this.getPlantNutrients() }</div>
						<div className="plant-single__ph">{ this.getPlantPh() }</div>
					</div>
				</div>
			</div>
	}

});