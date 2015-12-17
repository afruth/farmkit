CC.PlantSingle = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		if(this.props.docId){
			var handlePlant = Meteor.subscribe('plant', this.props.docId);
			// var handlePlantTypes = Meteor.subscribe('plantTypes');
		}

		return {
			plant: this.props.docId && Plant.findOne(this.props.docId),
			// plantFamily: this.data.plant && PlantFamilies.findOne(this.data.plant.plantType)
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
			// Error: returns undefined: 
			// PlantFamilies is returning an empty array in the console, and undefined here,
			//  but returns expected data in getMeteorData()
			let plantType = PlantFamilies.findOne(this.data.plant.plantType);
			console.log(plantType)
			if( plantType ){
				return plantType.name;   
			}
		}
	},
	getPlantArea() {
		if( this.data.plant ){
			// Error: returns undefined:
			let plantType = PlantFamilies.findOne(this.data.plant.areaId);
			console.log(plantType)
			if( plantType ){
				return plantType.name;   
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