import React from 'react';
import Table from '../components/table';
import Modal from './modal';
import Scheduller from '../services/scheduller';
import Chart from './chart';
import Memory from './memory';
import Disk from './disk';
import NewChart from './newchart';
export default class Menu extends React.Component{
    'use strict'
    constructor(props){
        super(props);
        this.state = {
          fifoResult : {},
          sjfResult : {},
          rrResult : {},
          edfResult : {},
          procs:[],
          quantum:undefined,
          over:undefined,
          tc:'',
          te:'',
          dl:'',
          pr:''
        }

        this.count = 0;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCalc = this.handleCalc.bind(this);
    }

    render() {
        return (
            <div style={{marginTop:30}}>
                <div className='container'>       
                    <div className='row'>
                        <Disk/>
                        <Memory/>
                        <Table items={this.state.procs}/>
                        <div className='col-lg-3 col-xs-12'>
                            <div class="card text-center">
                                <div class="card-header">
                                    Featured
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="proc-over">
                                                    Over head
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-over"
                                                    onChange={(e) => this.setState({over:Number(e.target.value)})}
                                                    value={this.state.over}
                                                />
                                                <label htmlFor="proc-quantum">
                                                    Quantum
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-quantum"
                                                    onChange={(e) => this.setState({quantum:Number(e.target.value)})}
                                                    value={this.state.quantum}
                                                />
                                                <label htmlFor="proc-tc">
                                                    T. chegada
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-tc"
                                                    onChange={(e) => this.setState({tc:Number(e.target.value)})}
                                                    value={this.state.tc}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="proc-te">
                                                    T. execução
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-te"
                                                    onChange={(e) => this.setState({te:Number(e.target.value)})}
                                                    value={this.state.te}
                                                />
                                                <label htmlFor="proc-pr">
                                                    Prioridade
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-pr"
                                                    onChange={(e) => this.setState({pr:Number(e.target.value)})}
                                                    value={this.state.pr}
                                                />
                                                <label htmlFor="proc-dl">
                                                    Deadline
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="proc-dl"
                                                    onChange={(e) => this.setState({dl:Number(e.target.value)})}
                                                    value={this.state.dl}
                                                />
                                            </div>
                                            </div>
                                            <button style = {{marginTop:18}} className="btn btn-success btn-block">
                                                Add
                                            </button>
                                        </div>                                
                                    </form>
                                    <button className="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModalLong" onClick={this.handleCalc}>Calc</button>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className='row'>
                        <div className="col-lg-6">
                            <div class="card text-center">
                                <div class="card-header">
                                    FIFO
                                </div>
                                <div class="card-body">
                                    <NewChart data={this.state.fifoResult.proclist}/>
                                </div>
                                <div class="card-footer text-muted">
                                    Tempo médio {this.state.fifoResult.tm}
                                </div>
                            </div>  
                        </div>
                        <div className="col-lg-6">
                            <div class="card text-center">
                                <div class="card-header">
                                    SJF
                                </div>
                                <div class="card-body">
                                    <NewChart data={this.state.sjfResult.proclist}/>
                                </div>
                                <div class="card-footer text-muted">
                                    Tempo médio {this.state.sjfResult.tm}
                                </div>
                            </div> 
                        </div>                        
                    </div>
                    <div className="row" style={{marginTop:30}}>
                        <div className="col-lg-6">
                            <div class="card text-center">
                                <div class="card-header">
                                    RR
                                </div>
                                <div class="card-body">
                                    <NewChart data={this.state.rrResult.proclist}/>
                                </div>
                                <div class="card-footer text-muted">
                                    Tempo médio {this.state.rrResult.tm}
                                </div>
                            </div> 
                        </div>
                        <div className="col-lg-6">
                            <div class="card text-center">
                                <div class="card-header">
                                    EDF
                                </div>
                                <div class="card-body">
                                    <NewChart data={this.state.edfResult.proclist}/>
                                </div>
                                <div class="card-footer text-muted">
                                    Tempo médio {this.state.edfResult.tm}
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>          
            </div>
        )
    }
    
    handleSubmit(e) {
        e.preventDefault();

        const newItem = {
            id : 'p'+this.count, 
            tc : this.state.tc,
            te : this.state.te,
            dl : this.state.dl,
            pr : this.state.pr
        };
        
        this.setState(prevState => ({
            items: prevState.procs.push(newItem)
        }));

        this.count++;

        console.log(this.state.procs);
    }

    handleCalc(){

      const sch = new Scheduller();
      this.setState({fifoResult:sch.fifo(this.state.procs)});
      this.setState({sjfResult:sch.sjf(this.state.procs)});
      this.setState({rrResult:sch.rr(this.state.procs,this.state.quantum,this.state.over)})
      this.setState({edfResult:sch.edf(this.state.procs,this.state.quantum,this.state.over)});
    }

}