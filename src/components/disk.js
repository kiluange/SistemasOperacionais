import React from 'react';

export default class Disk extends React.Component{
    render() {
      return (
        <div className="col-lg-3">
          <div class="card text-center">
            <div class="card-header">
              Disco
            </div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
              2 days ago
            </div>
          </div>          
        </div>
      )
    }
}