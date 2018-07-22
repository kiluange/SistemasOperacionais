import React from 'react';
import Plot from 'react-plotly.js';

export default class Chart extends React.Component{
    constructor(props){
        super(props);
        this.yData = ['Product A', 'Product B', 'Product C'];
    }
    render() {
        
      return (
        <Plot
          data = {
            [
              //tempo de Chegada
              {
                y: this.xData,
                x: this.props.data.chegada,
                type: 'bar',
                text: [20, 14, 23],
                textposition: 'auto',
                hoverinfo: 'none',
                opacity: 0.0,
                orientation: 'h',
                marker: {
                  color: 'rgb(158,202,225)',
                  line: {
                    color: 'rbg(8,48,107)',
                    width: 1.5
                  }
                }
              },
              //tempo de espera
              {
                y: this.xData,
                x: this.props.data.espera,
                type: 'bar',
                text: [20, 14, 23],
                textposition: 'auto',
                hoverinfo: 'none',
                opacity: 0.5,
                orientation: 'h',
                marker: {
                  color: 'rgb(158,202,225)',
                  line: {
                    color: 'rbg(8,48,107)',
                    width: 1.5
                  }
                }
              },
              //tempo de execução
              {
                y: this.xData,
                x: this.props.data.execucao,
                type: 'bar',
                text:  [24, 16, 20],
                textposition: 'auto',
                hoverinfo: 'none',
                orientation: 'h',
                marker: {
                  color: 'rgba(58,200,225,.5)',
                  line: {
                    color: 'rbg(8,48,107)',
                    width: 1.5
                  }
                }
              },
              //ovehead
              {
                y: this.xData,
                x: this.props.data.overhead,
                type: 'bar',
                text:  [24, 16, 20],
                textposition: 'auto',
                hoverinfo: 'none',
                orientation: 'h',
                marker: {
                  color: 'rgba(244, 66, 66,.5)',
                  line: {
                    color: 'rbg(8,48,107)',
                    width: 1.5
                  }
                }
              }

            ]
          }
          layout={  {width: '100%', height: 340, title:this.props.title, barmode: 'relative'} }
        />
      )
    }
}