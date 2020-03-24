import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SideDrawer from './sidedrawer';
import './Tracker.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import Output from '../components/Output/Output';

import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';




class Tracker extends Component{
 
    state={
        activity:'',
        endTime:"11:00",
        startTime:"12:00",
        startDate:new Date(),
        reder:0,
        displayActivities: false,
        activitydate:new Date(),
        display:new Date()
      };
     
      handleChangeActivity =(input)=> 
      {
          this.setState({ activity:input })
      } 

      handleChange= startDate => 
      {
          this.setState({startDate:startDate})
      } 
      
      handleTimeEnd = event => this.setState({ startTime:event.target.value})

      handleTime = event => this.setState({ endTime:event.target.value})
   
      
      handleChangedateActivity = activitydate=>
      {
     
        this.setState({activitydate:activitydate})
        console.log(this.state)
      }
      onShowActivitiesHandler = () => {
        this.setState({
            displayActivities: !this.state.displayActivities
        })
      }
      prevHadler=()=>{
         let datevar=this.state.activitydate
         datevar.setDate(datevar.getDate()-1)
         console.log(datevar)
         this.setState({activitydate:datevar})
         let currdate=`${this.state.activitydate.getMonth() + 1}/${this.state.activitydate.getDate()}/${this.state.activitydate.getFullYear()}`
         console.log(currdate)
         this.setState({display: currdate})


      }
      nextHadler=()=>{
        let datevar=this.state.activitydate
        datevar.setDate(datevar.getDate()+1)
        this.setState({activitydate:datevar})
        let currdate=`${this.state.activitydate.getMonth() + 1}/${this.state.activitydate.getDate()}/${this.state.activitydate.getFullYear()}`
        console.log(currdate)
         this.setState({display: currdate})

     }

     submitHandler = (inputTask,inputTime,endtime)=>{
       
      this.setState({
        displayActivities: true
    })
      console.log("submitentered")
      
      let i=0;
     
      let lenOfactivity;
   
     this.user=JSON.parse(localStorage.getItem(this.props.username))
      
      
    lenOfactivity=this.user.List.length;

    if(lenOfactivity===7)
    {
      this.user.List.shift()
    }
   
    while(i<lenOfactivity)
    {i++;}
   
      

      
      this.user.List[i-1].startTime.push(this.state.startTime)
      this.user.List[i-1].endTime.push(this.state.endTime)
      this.user.List[i-1].activity.push(this.state.activity)
      this.user.List[i-1].dur.push((this.state.endTime-this.state.startTime)/60000)
      this.user.List[i-1].date.push(moment(this.state.startDate).format('L'));
   
   localStorage.setItem(this.props.username,JSON.stringify(this.user))

  
   this.setState({reder:1})
    

    }

    render()
    {

     
      let user1=JSON.parse(localStorage.getItem(this.props.username))
      
      
        return(


            <div>
                
               
                <div>
                Activity<input className="Act" type="text" placeholder="Enter the Activity" onChange={(event)=>this.handleChangeActivity(event.target.value)}></input><br/><br/>
                Start Date :<DatePicker dateFormat='dd-MM-yyyy' selected={this.state.startDate} value={this.state.startDate}  onChange={this.handleChange} /><br/><br/>
                Start Time:<TimePickerComponent    value={this.state.startTime} onChange={this.handleTimeEnd} /><br/><br/>
                End Time:<TimePickerComponent  value={this.state.endTime} onChange={this.handleTime} /><br/><br/>
                <button id="btn1" type="submit" onClick={() => this.submitHandler(this.state.activity,this.state.startTime,this.state.endTime)} >Add</button>
              </div>
                <button 
                onClick={() => this.onShowActivitiesHandler()}>{!this.state.displayActivities ? 'Show Activities' : 'Close Activities'}</button>
              {this.state.displayActivities ?
              <MDBTable>
              <MDBTableHead>
                <tr>
                  <td><button onClick={()=>this.prevHadler()}>prev</button></td>
                  <td colSpan="3"><DatePicker id="date" dateFormat='dd-MM-yyyy' selected={this.state.activitydate} value={this.state.activitydate} onChange={this.handleChangedateActivity} /><br/><br/> </td>
                  <td><button onClick={()=>this.nextHadler()}>next</button></td>
                </tr>
              <tr>
                        <th>S.No</th>
                        <th>Task</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                </tr>
                </MDBTableHead>
              
              <Output date={this.state.display} username={this.props.username}/>
              </MDBTable>:null}
              </div>
            
            
        )
    }
}
export default Tracker;

