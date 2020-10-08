import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Bar} from 'react-chartjs-2';
import './Dashboard.css'

const IssuesCharts = props => {
    const initialDataState = {
        labels:['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun'],
        datasets:[{
            label:'Total Fuel',
            data:[
                10,
                18,
                3,
                7,
                6,
                5
              ],
              //backgroundColor:'green',
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ],
            
        
    
        }]
    }
    
      const [data, setData] = useState(initialDataState)
    return (
        <div>
            <div class="card rounded shadow card-size">
                <div class="card-body">
                    <h4 class="card-title">Issues Open</h4>
                    <Bar
                        data={data}
                
                        options={{ 
                            title:{
                                display:props.displayTitle,
                                text:'Issues Opened',
                                fontSize:40
                            },
                            legend:{
                                display:props.displayLegend,
                                position: props.legendPosition
                            },
                            maintainAspectRatio: true 
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

IssuesCharts.propTypes = {

}

export default IssuesCharts
