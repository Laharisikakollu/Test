import React , {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SideDrawer from './sidedrawer';
import Backdrop from './backdrop';
import Toolbar from './toolbar';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';




class Tracker extends Component{
  constructor(props)
  {

    super(props)
    this.state={
        activity:'',
        time:"",
        endTime:"11:00",
        startTime:"12:00",
        startDate:new Date(),
        reder:0,
        sidedraweropen:false
      };
      this.submitHandler=this.submitHandler.bind(this);
      
    }

    drawerHandler = () => {
      this.setState((prevState)=>{
        return{sidedraweropen:!prevState.sidedraweropen}
      });
    }
  
    backdropHandler = () => {
      this.setState({sidedraweropen:false});
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
        
        let i=0;
        let isbreak=0;
        let lenOfactivity;
     
       this.user=JSON.parse(localStorage.getItem(this.props.username))
        
        
      lenOfactivity=this.user.List.length;
      while(i<lenOfactivity){
        if(moment(this.state.startDate).format('L')!==moment(this.user.List[i].date[0]).format('L'))
       { i++;}
       else{
         isbreak=1;
         break; 
       }
     
      }

      if(lenOfactivity===7)
      {
        this.user.List.shift()
      }
     
     
      
      
      if(isbreak===0)
       
        {

          this.user.List.push({date:[this.state.startDate],activity:[this.state.activity],startTime:[this.state.startTime],endTime:[this.state.endTime]});
      
      } 

      else
      {
        
        this.user.List[lenOfactivity===7?i-1: i].startTime.push(this.state.startTime)
        this.user.List[lenOfactivity===7?i-1: i].endTime.push(this.state.endTime)
        this.user.List[lenOfactivity===7?i-1: i].activity.push(this.state.activity)
         this.user.List[lenOfactivity===7?i-1: i].date.push(this.state.startDate)
      }
     localStorage.setItem(this.props.username,JSON.stringify(this.user))

    
     this.setState({reder:1})
      

      }

      
    render()
    {

      let sidedrawer;
      let backdrop;
  
      if(this.state.sidedraweropen)
      {
        sidedrawer=<SideDrawer/>
        backdrop=<Backdrop click={this.backdropHandler}/>
      }

      let user1=JSON.parse(localStorage.getItem(this.props.username))
      
      
        return(


            <div>
                <div>
                <Toolbar drawerClicked={this.drawerHandler}/>
                  {sidedrawer}
                  {backdrop}
                </div>
                <div>
                Activity<input className="inputField" type="text" placeholder="Enter the Activity" onChange={(event)=>this.handleChangeActivity(event)} value={this.state.activity}></input><br/><br/>
                Start Date :<DatePicker selected={this.state.startDate}   onChange={this.handleChange} /><br/><br/>
                Start Time:<TimePickerComponent    onChange={this.handleTime} value={this.state.startTime} /><br/><br/>
                End Time:<TimePickerComponent  value={this.state.endTime} onChange={this.handleTimeEnd} /><br/><br/>
                <button id="btn1" type="submit" onClick={this.submitHandler} >Add</button>

                </div>
               
                 <ul>
                {     
                  user1.List.map((item,key)=>{
                    const date = item.date[0];

                return  ( 
                <div> {date && <span>{moment(date).format('L')}</span>}
                 {item.activity.map((item1,key)=>{
                return <li>Activity:{item1}&nbsp;&nbsp;&nbsp;&nbsp;Duration:{moment(item.startTime[key]).diff(moment(item.endTime[key]))}</li>
                })}</div>
                )
              
                }
              )}
              </ul> 
            </div>
        )
    }
}
export default Tracker