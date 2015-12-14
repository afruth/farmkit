CC.AddPlantForm = React.createClass ({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handlePlantTypes = Meteor.subscribe('plantTypes');
    var handlePlantAreas = Meteor.subscribe('plantAreas');
  },
  render() {
    return <div className="plantFormHolder">
      <form id="plantAdd">
        <h2>Add a new plant</h2>

      </form>
    </div>
  }
});