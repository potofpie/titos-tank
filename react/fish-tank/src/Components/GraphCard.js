//Not My Components
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import LineChart from 'react-linechart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';


//CSS
import '../App.css';
import '../../node_modules/react-linechart/dist/styles.css';




class GraphCard extends Component {
    render() {
        const data = [
          {									
              color: "black", 
              points: [{x: 0, y: 72}, {x: 10, y: 74},  {x:20, y: 78}, {x: 30, y: 80}, {x: 40, y: 81}, {x: 50, y: 75}, {x: 60, y: 74}, {x: 70, y: 76}, {x: 80, y: 81}, {x: 90, y: 79}, {x: 100, y: 71}] 
          }
      ];
      return (
        <Card className="App-graph-card">
        <AppBar position="static" color="default">
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Temperature" />
            <Tab label="Water Level" />
            <Tab label="PH" />
          </Tabs>
        </AppBar>
        <LineChart yMin={0} yMax={90}  xLabel="Time" yLabel="Temperature" width={500} height={300} data={data} />
      </Card>
      );
    }
  }
  
  export default GraphCard;