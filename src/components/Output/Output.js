import React, { Component } from 'react';
import moment from 'moment';

class Output extends Component{
    render(){
        let c=0
        let  user1 = JSON.parse(localStorage.getItem(this.props.username))
        let date1=this.props.date
        console.log(date1)
        let val =user1.List[0].date.includes(moment( date1).format('L'))
        if(val)
        {
            
            return user1.List[0].date.map((item,key)=>{
                if((moment(date1).format('L'))==moment(item).format('L'))
                {
                    c++
                    return(
                        <tbody>
                            <tr>
                                <td>{c}</td>
                                <td>{user1.List[0].activity[key]}</td>
                                <td>{moment( user1.List[0].startTime[key]).format('HH:mm')}</td>
                                <td>{moment( user1.List[0].endTime[key]).format('HH:mm')}</td>
                                <td>{user1.List[0].dur[key]}</td>
                            
                            </tr>
                        </tbody>
                        )
                    }

            })
        }
        else{
            return(<tbody><tr>
                <td colSpan="5"><h1>Activities Not Found</h1></td>
                
                </tr></tbody>)
        }
    }
}
export default Output;