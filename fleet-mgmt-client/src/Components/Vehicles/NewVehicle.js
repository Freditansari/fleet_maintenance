import React, {useState} from 'react'
import PropTypes from 'prop-types'

const NewVehicle = props => {
    const newVehicleState = {
        vehicleName: '',
        type: '',
        model:'',
        hullNumber :'', 
        isOperational:true

    }
    const [NewVehicle, setNewVehicle] = useState(newVehicleState);

    const handleInputChange = event =>{
        const {name, value} = event.target;
        setNewVehicle({...NewVehicle, [name]: value});
        // console.log(NewVehicle)
    }

    const handleNewVehicleSubmit =(vehicle) =>{
        console.log(NewVehicle)
        // todo handle to send database

    }

    return (
        <div class = "container">
            <form class="border border-light p-5 mt-5">

            <p class="h4 mb-4 text-center">New Vehicle</p>


            <label for="VehicleName">Vehicle Name</label>
            <input type="text" name ="vehicleName" value={NewVehicle.name} onChange={handleInputChange} class="form-control mb-4" placeholder="Enter a Vehicle name" />

            <label for="selectCategory">Select vehicle type:</label>
            <select class="browser-default custom-select mb-4" id="select" name="type" value={NewVehicle.type} onChange={handleInputChange}>
                {/* <option value="" disabled="" selected="">Choose Vehicle Type</option> */}
                <option value="Light Vehicle<">Light Vehicle</option>
                <option value="Excavators">Excavators</option>
                <option value="Bulldozers">Bulldozers</option>
                <option value="Tractors">Tractors</option>
                <option value="Trucks">Trucks</option>
            </select>


            <label for="vehicle_model">Model</label>
            <input type="text" id="vehicle_model" name="model"  value={NewVehicle.model} class="form-control mb-4" onChange={handleInputChange} placeholder="Enter Model" />

            <label for="hull_number_vehicle">Hull Number</label>
            <input type="text" id="hull_number_vehicle" name="hullNumber"  value={NewVehicle.hullNumber} class="form-control mb-4" onChange={handleInputChange} placeholder="Enter Hull Numbers" />


            <button class="btn btn-info btn-block" onClick={(event) =>{
                event.preventDefault();
                handleNewVehicleSubmit();
                }} type="submit">Save</button>
            </form>
        </div>
    )
}

NewVehicle.propTypes = {

}

export default NewVehicle
