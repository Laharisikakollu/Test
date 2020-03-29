import React, { Component } from 'react';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import axios from 'axios';
class Output extends Component{
    state={
        display:""
    }
    componentDidMount()
    {
        const token = localStorage.getItem("token")
        let self= this
            const payload = jwt.decode(token)
            console.log(payload.userName)
            console.log(this.props.date)
            axios.get('http://localhost:8000/activities/' + this.props.date+'/'+payload.userName)
            .then (function(response) {
                console.log(response.data)
                self.setState({ display: response.data })
                 console.log(self.state)
            }).catch(err => {
            console.log(err)
        })
    }
    componentDidUpdate(previousProps,previousState)
    {
        const token = localStorage.getItem("token")
        let self= this
            const payload = jwt.decode(token)
            console.log(payload.userName)
            console.log(this.props.date)
            axios.get('http://localhost:8000/activities/' + this.props.date+'/'+payload.userName)
            .then (function(response) {
                console.log(response.data)
                console.log(previousProps.date)
                console.log(self.props.date)
                if(previousProps.date!==self.props.date || previousProps.a!==self.props.a)
                self.setState({ display: response.data })
                 console.log(self.state)
            }).catch(err => {
            console.log(err)
        })
    }
    render(){
        let c=0
//         let  user1 = JSON.parse(localStorage.getItem(this.props.username))
//         let date1=this.props.date
//         console.log(date1)
//         let val =user1.List[0].date.includes(moment( date1).format('L'))
//         if(val)
//         {
            
//             return user1.List[0].date.map((item,key)=>{
//                 if((moment(date1).format('L'))==moment(item).format('L'))
//                 {
//                     c++
//                     return(
//                         <tbody>
//                             <tr>
//                                 <td>{c}</td>
//                                 <td>{user1.List[0].activity[key]}</td>
//                                 <td>{moment( user1.List[0].startTime[key]).format('HH:mm')}</td>
//                                 <td>{moment( user1.List[0].endTime[key]).format('HH:mm')}</td>
//                                 <td>{user1.List[0].dur[key]}</td>
                            
//                             </tr>
//                         </tbody>
//                         )
//                     }

//             })
//         }
//         else{
//             return(<tbody><tr>
//                 <td colSpan="5"><h1>Activities Not Found</h1></td>
                
//                 </tr></tbody>)
//         }
//     }
// }
if(this.state.display)
{
    return(
        
            <tbody>
                  {
            this.state.display.data.map(item=>{
               c++;
               let endtime = "No end time specified";
                    let duration= "-";
                    if (item.endTime !== null) {
                        duration = moment.utc(moment.utc(moment(item.endTime,"HH:mm:ss").diff(moment(item.startTime,"HH:mm:ss")))).format('HH:mm:ss')
                       endtime=item.endTime
                    }
                return( <tr>
                    
                    
            <td>{c}</td>
            <td>{item.activity}</td>
            <td >{item.startTime}</td>
            <td>{endtime}</td>
            <td>{duration}</td>
                </tr>)
            })
            }
            </tbody>
        
    )
        }
        else{
            return(<h1>hi</h1>)
        }
}
}
export default Output;
// moment.utc(moment.utc(moment(item.endTime,"HH:mm:ss").diff(moment(item.startTime,"HH:mm:ss")))).format('HH:mm:ss')