import React, { Component } from 'react'
import moment from 'moment';
import Rep from './Report.css';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
class Report extends Component
{
    state={
        outputs:""
    }

    componentDidMount()
    {
        const token = localStorage.getItem("token")
        let self= this
            const payload = jwt.decode(token)
            console.log(payload.userName)
            axios.get('http://localhost:8000/report/' + payload.userName)
            .then (function(response) {
                self.setState({ outputs: response.data })
                 console.log(response.data.result)
                 console.log(response.data)
            }).catch(err => {
            console.log(err);
            })
            
    }
    
    render()
    {
        // let user1=JSON.parse(localStorage.getItem(this.props.username))
        // console.log(user1)
        // var dateObj = new Date();
        // dateObj.setDate(dateObj.getDate()+1)
        // console.log(dateObj)
        // var c=0;
        // let durlist=[]
        // var datelist=[]
        // var taskscou=[]
    //     for(let i=0;i<7;i++)
    //     {
    //        c=0;
    //         let dur=0;
    //         dateObj.setDate(dateObj.getDate()-1)
    //         console.log(moment( dateObj).format('L'))
    //         user1.List[0].date.map((item,key) => {
                
    //             console.log(item)

    //             if((moment(dateObj).format('L')) === moment(item).format('L') && user1.List[0].dur[key]!=null)
    //             {
    //                     c++;
    //                     dur=dur+(user1.List[0].dur[key])
    //             }
                    
    //            if(!datelist.includes(moment( dateObj).format('L')))
    //            {
    //                 datelist.push(moment( dateObj).format('L'))
    //                 taskscou.push(c)
    //                 durlist.push(dur)
    //         }

    //             else
    //             {
    //                 let h=datelist.indexOf(moment( dateObj).format('L'))
    //                 taskscou[h]=c
    //                 durlist[h]=dur
    //             }
                
    //     })
    //     console.log(durlist)
    //     console.log(datelist)
    //     console.log(taskscou)
        
    // }

    if(this.state.outputs)
    {
        
        return(
            <div className="Rep">
                <MDBTable>
                    <MDBTableHead color="primary-color" textWhite>
                    <tr>
                        <th>Date</th>
                        <th>no of tasks</th>
                        <th>Duration</th>
                    </tr>
                    </MDBTableHead>
                {
                    
                this.state.outputs.output.map((item,key)=>{
                    return <tr>
                <td>{item.date}</td>
                <td>{item.tasks}</td>
                <td>{item.duration}</td>
                    </tr>
                })
                }
                
                </MDBTable>
            </div>
        )
    }
else{
    return(<h1>hi</h1>)
}}
}
export default Report;