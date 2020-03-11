import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import TimePicker from 'react-time-picker';



class Tracker extends Component{
  constructor(props)
  {

    super(props)
    this.state={
        activity:'',
        time:"",
        endTime:"",
        startTime:"",
        startDate:"",
        reder:0
      

      };
      this.submitHandler=this.submitHandler.bind(this);
      
    }
    

     

      handleChangeActivity = event => 
      {
          this.setState({ activity:event.target.value })
      } 

      handleChange= startDate => 
      {
          this.setState({startDate:startDate})
      } 
      
      handleTimeEnd = event => this.setState({ startTime:event.target.value})

      handleTime = event => this.setState({ endTime:event.target.value})
   
      
      submitHandler(){
       
        console.log("submitentered")
        let day=new Date();
        let i=0;
        let lenOfactivity;
     
       this.user=JSON.parse(localStorage.getItem(this.props.username))
        

      lenOfactivity=this.user.List.length;

      if(lenOfactivity===7)
      {
        this.state.user.List.shift()
      }
     
     
       while(i<lenOfactivity){
     
         i++;
      
       }
      
      
       //this.state.user.List[i-1].activity.push(this.state.activity)
       this.user.List[i-1].startTime.push(this.state.endTime-this.state.startTime)
       this.user.List[i-1].endTime.push(this.state.endTime)
       this.user.List[i-1].activity.push(this.state.activity)
       this.user.List[i-1].date.push(this.state.startDate)

     localStorage.setItem(this.props.username,JSON.stringify(this.user))

    
     this.setState({reder:1})
      

      }

      
    render()
    {
      let user1=JSON.parse(localStorage.getItem(this.props.username))
      
      
        return(
            <div>
                
                Activity<input className="inputField" type="text" placeholder="Enter the Activity" onChange={(event)=>this.handleChangeActivity(event)} value={this.state.activity}></input><br/><br/>
                Start Date :<DatePicker selected={this.state.startDate} value={this.state.startDate} dateFormat="dd-MM-yyyy" onChange={this.handleChange} /><br/><br/>
                Start Time:<TimePickerComponent    onChange={this.handleTime} value={this.state.startTime} /><br/><br/>
                End Time:<TimePickerComponent  value={this.state.endTime} onChange={this.handleTimeEnd} /><br/><br/>
                <button id="btn1" type="submit" onClick={this.submitHandler} >Add</button>
                 
                 
                 <ul>
                {     user1.List.map((item,key)=>{
                
                return item.activity.map((item1,key)=>{
                return <li>Activity:{item1}&nbsp;&nbsp;Date:{item.date[key]}&nbsp;&nbsp;Duration:{item.startTime[key]}</li>
                })
                
                
                }
              )}
              </ul> 
            </div>
        )
    }
}
export default Tracker