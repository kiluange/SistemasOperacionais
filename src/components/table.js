import React from 'react';

export default class Table extends React.Component {

  render() {
    return (
        <div className = 'col-lg-3 col-xs-12'>
            <div class="card text-center">
                <div class="card-header">
                    Processos
                </div>
                <div class="card-body"  style={{height:252, overflowX:"auto"}}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>TC</th>
                                <th>TE</th> 
                                <th>PR</th>
                                <th>DL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items.map((item) => ( 
                                <tr>
                                    <td>{item.tc}</td>
                                    <td>{item.te}</td> 
                                    <td>{item.pr}</td>
                                    <td>{item.dl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
}
