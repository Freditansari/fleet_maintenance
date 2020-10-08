import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css'

const VehicleDashboards = props => {
    return (
        <div>
            <div class="card rounded shadow card-size">
                
                <div class="card-body">
           
                    <h4 class="card-title">Vehicle Dashboards</h4>
                  
                    <div className="row mt-3">
                        <div className="col-sm">
                            <h6>Operational Cars</h6>
                        </div>
                        <div className="col-sm maintenance-danger">
                            <span class="badge badge-pill badge-success">11</span>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm">
                            <h6>Inoperational Cars</h6>
                        </div>
                        <div className="col-sm maintenance-danger">
                            <span class="badge badge-pill badge-danger">7</span>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-sm">
                            <h6>In maintenance</h6>
                        </div>
                        <div className="col-sm maintenance-danger">
                            <span class="badge badge-pill badge-warning">3</span>
                        </div>
                    </div>

                  
                </div>
            </div>
        </div>
    )
}

VehicleDashboards.propTypes = {

}

export default VehicleDashboards
