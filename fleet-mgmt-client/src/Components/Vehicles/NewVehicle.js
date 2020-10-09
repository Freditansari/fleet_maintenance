import React from 'react'
import PropTypes from 'prop-types'

const NewVehicle = props => {
    return (
        <div class = "container">
            <form class="border border-light p-5 mt-5">

            <p class="h4 mb-4 text-center">New Vehicle</p>


            <label for="VehicleName">Vehicle Name</label>
            <input type="text" id="VehicleName" class="form-control mb-4" placeholder="Enter a Vehicle name" />

            <select class="browser-default custom-select mb-4" id="select">
                <option value="" disabled="" selected="">Choose Vehicle Type</option>
                <option value="1">Light Vehicle</option>
                <option value="2">Excavators</option>
                <option value="3">Bulldozers</option>
                <option value="4">Tractors</option>
                <option value="5">Trucks</option>
            </select>


            <label for="vehicle_model">Model</label>
            <input type="text" id="vehicle_model" class="form-control mb-4" placeholder="Enter Model" />

            <label for="hull_number_vehicle">Hull Number</label>
            <input type="text" id="hull_number_vehicle" class="form-control mb-4" placeholder="Enter Hull Numbers" />


            <button class="btn btn-info btn-block" type="submit">Save</button>
            </form>
        </div>
    )
}

NewVehicle.propTypes = {

}

export default NewVehicle
