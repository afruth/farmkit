CC.PlantSingle = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		if(this.props.docId){
			var handlePlant = Meteor.subscribe('plant', this.props.docId);
			var handlePlantTypes = Meteor.subscribe('plantTypes');
			var handlePlantArea = Meteor.subscribe('plantAreas');
		}

		return {
			plant: this.props.docId && Plant.findOne(this.props.docId),
			plantFamilies: PlantFamilies.find().fetch(),
			plantAreas: PlantAreas.find().fetch(),
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
	render() {
		console.log(this.data)
		return (
			<div className="plant-single">
				<div className="ui grid container">
					<div className="eight wide column">
						<div className="plant-single__image-box">
							<div className="plant-single__image"></div>
						</div>
					</div>
					<div className="eight wide column">
						<div className="plant-single__name">
							<h3 className="ui header">{ this.getPlantName() }</h3>
						</div>
						<div className="plant-single__family">{ this.getPlantFamily() }</div>
						<div className="plant-single__area">{ this.getPlantArea() }</div>
						<div className="plant-single__date-planted">{ this.getPlantName() }</div>
					</div>
					<div className="sixteen wide column">
						<div className="plant-single__growing-medium">{ this.getPlantName() }</div>
						<div className="plant-single__nutrient">{ this.getPlantName() }</div>
						<div className="plant-single__ph">{ this.getPlantName() }</div>
					</div>
				</div>
			</div>
		)
	}

});