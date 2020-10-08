import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css'

const ReminderCards = props => {
    return (
        <div>
            <div class="card rounded shadow card-size">
                
                <div class="card-body">
           
                    <h4 class="card-title">Maintenance Reminders</h4>
                  
                    <div className="row mt-5">
                    <div className="col-sm maintenance-warning">
                        <h6>Upcoming Maintenance</h6>
                        <h6> 5</h6>
                    </div>
                    <div className="col-sm maintenance-danger">
                        <h6>Overdue Maintenance</h6>
                        <h6> 7</h6>
                    </div>
                    </div>
                    

                  
                </div>
            </div>
        </div>
    )
}

ReminderCards.propTypes = {

}

export default ReminderCards
