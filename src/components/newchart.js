import { Chart } from 'react-google-charts';
import React from 'react';
 
class NewChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Turnaround',
        legend: 'none',        
      },
      data:{
          columns:[{ type: 'string', id: 'Proc' },{ type: 'string', id: 'Name' },{ type: 'date', id: 'Start' },{ type: 'date', id: 'End' }],
          rows:[
            /* 
            [ 'P1', new Date(0,0,0,0,0,0), new Date(0,0,0,0,0,5) ],
            [ 'P2', new Date(0,0,0,0,0,0), new Date(0,0,0,0,0,5) ],
            [ 'P2', new Date(0,0,0,0,0,5),  new Date(0,0,0,0,0,7) ],
            [ 'P3', new Date(0,0,0,0,0,5),  new Date(0,0,0,0,0,10) ] */
        ]
      }
    };
  }
  render() {
    return (
      <Chart
        chartType="Timeline"
        columns={this.state.data.columns}
        rows={this.props.data}
        options={this.state.options}
        width="auto"
        height="200px"
        legend_toggle
      />
    );
  }
}
export default NewChart;