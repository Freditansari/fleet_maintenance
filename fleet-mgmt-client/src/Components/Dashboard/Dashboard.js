import React from 'react'
import PropTypes from 'prop-types'
import Fuelchart from './Fuelchart'
import ReminderCards from './ReminderCards'
import './Dashboard.css'
import VehicleDashboards from './VehicleDashboard'

const Dashboard = props => {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm card-size">                 
                        <Fuelchart />
                    </div>
                    <div className="col-sm">
                        <ReminderCards />
                    </div>
                    <div className="col-sm">
                        <VehicleDashboards />
                    </div>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
