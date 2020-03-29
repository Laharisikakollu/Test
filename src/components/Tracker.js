import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SideDrawer from './sidedrawer';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import './Tracker.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import Output from '../components/Output/Output';

import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';




class Tracker extends Component{
 
    state={
        activity:'',
        endTime:"",
        startTime:"12:00",
        startDate:new Date(),
        reder:0,
        displayActivities: false,
        activitydate:new Date(),
        display:new Date(),
        a1:{}
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
     
        let da =`${activitydate.getFullYear() }-${activitydate.getMonth()+1}-${activitydate.getDate()}`
        this.setState({activitydate:activitydate,display:da})
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
         let currdate=`${this.state.activitydate.getFullYear() }-${this.state.activitydate.getMonth()+1}-${this.state.activitydate.getDate()}`
         console.log(currdate)
         this.setState({display: currdate})


      }
      nextHadler=()=>{
        let datevar=this.state.activitydate
        datevar.setDate(datevar.getDate()+1)
        this.setState({activitydate:datevar})
        let currdate=`${this.state.activitydate.getFullYear() }-${this.state.activitydate.getMonth()+1}-${this.state.activitydate.getDate()}`
        console.log(currdate)
         this.setState({display: currdate})

     }

     submitHandler = (inputTask,inputTime,endtime)=>{
       
      this.setState({
        displayActivities: true,
       
    })
  //     console.log("submitentered")
      
  //     let i=0;
     
  //     let lenOfactivity;
   
  //    this.user=JSON.parse(localStorage.getItem(this.props.username))
      
      
  //   lenOfactivity=this.user.List.length;

  //   if(lenOfactivity===7)
  //   {
  //     this.user.List.shift()
  //   }
   
  //   while(i<lenOfactivity)
  //   {i++;}
   
      

      
  //     this.user.List[i-1].startTime.push(this.state.startTime)
  //     this.user.List[i-1].endTime.push(this.state.endTime)
  //     this.user.List[i-1].activity.push(this.state.activity)
  //     this.user.List[i-1].dur.push((this.state.endTime-this.state.startTime)/60000)
  //     this.user.List[i-1].date.push(moment(this.state.startDate).format('L'));
   
  //  localStorage.setItem(this.props.username,JSON.stringify(this.user))

  const token = localStorage.getItem("token")
   let self = this;
        const payload = jwt.decode(token)
        let o1={}
        if(this.state.endTime!=="")
        {
          o1={
          activity:this.state.activity,
           startDate:this.state.startDate,
           startTime:moment(this.state.startTime,["hh:mm A"]).format('HH:mm:ss'),
           endTime:moment(this.state.endTime,["hh:mm A"]).format('HH:mm:ss')
          }
        }
           else{
             o1={
              activity:this.state.activity,
               startDate:this.state.startDate,
               startTime:moment(this.state.startTime,["hh:mm A"]).format('HH:mm:ss')
           }
          }
         axios.post('http://localhost:8000/activity/' + payload.userName,o1)
            
         .then(function (response) {
             console.log(response);
              alert("Data added successfully")
             self.setState({ activity:'' })
         }).catch(err => {
             console.log(err)
            
         })

         axios.get('http://localhost:8000/activities/' + this.state.startDate+'/'+payload.userName)
         .then(function(response){
           self.setState({a1:response.data})
         }
         )
  

  
   this.setState({reder:1})
  // activity:''})
    

    }

    render()
    {

     
      let user1=JSON.parse(localStorage.getItem(this.props.username))
      
      
        return(


            <div>
                
               
                <div>
                Activity<input className="Act" type="text" placeholder="Enter the Activity" onChange={(event)=>this.handleChangeActivity(event.target.value)} value={this.state.activity}></input><br/><br/>
                Start Date :<DatePicker dateFormat='dd-MM-yyyy' selected={this.state.startDate} value={this.state.startDate}  onChange={this.handleChange} /><br/><br/>
                Start Time:<TimePickerComponent    value={this.state.startTime} onChange={this.handleTimeEnd} /><br/><br/>
                End Time:<TimePickerComponent  value={this.state.endTime} onChange={this.handleTime} /><br/><br/>
                <MDBBtn color="danger" type="submit" onClick={() => this.submitHandler(this.state.activity,this.state.startTime,this.state.endTime)} >ADD</MDBBtn>
              </div>
                <MDBBtn color="warning" 
                onClick={() => this.onShowActivitiesHandler()}>{!this.state.displayActivities ? 'Show Activities' : 'Close Activities'}</MDBBtn>
              {this.state.displayActivities ?
              <MDBTable>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <td><MDBBtn color="light" onClick={()=>this.prevHadler()}>prev</MDBBtn></td>
                  <td colSpan="3"><DatePicker id="date" dateFormat='dd-MM-yyyy' selected={this.state.activitydate} value={this.state.activitydate} onChange={this.handleChangedateActivity} /><br/><br/> </td>
                  <td><MDBBtn color="light"  onClick={()=>this.nextHadler()}>next</MDBBtn></td>
                </tr>
              <tr>
                        <th>S.No</th>
                        <th>Task</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                </tr>
                </MDBTableHead>
              
              <Output date={this.state.display} username={this.props.username} a={this.state.a1}/>
              </MDBTable>:null}
              </div>
            
            
        )
    }
}
export default Tracker;

