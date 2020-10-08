import React from 'react'
import PropTypes from 'prop-types'
import Fuelchart from './Fuelchart'
import ReminderCards from './ReminderCards'
import './Dashboard.css'
import VehicleDashboards from './VehicleDashboard'
import Activities from './Activities/Activities'
import IssuesCharts from './IssuesCharts'
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
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-8 ">
                        <h4>Activities </h4>
                        <div className="overflow-auto">
                            <Activities />  
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <IssuesCharts />
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
