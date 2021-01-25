import {Component} from 'react';
import randomColor from 'randomcolor';
import {Link} from 'react-router-dom';
class Jobs extends Component{


    render(){
        let details= this.props.jobs.map((job, index)=>{
            
            
            
            function postedTime(created){
                let d = new Date();
                let now= d.getTime();
                let then = Date.parse(created)
                let difference=now-then
                difference=Math.floor(difference/1000)
                if(difference<3600){
                    return Math.floor(difference/60) + "m ago"
                }else if(difference< (3600*24)){
                    return Math.floor(difference/3600) + "h ago"
                }else if(difference< (3600*24*30)){
                    return Math.floor(difference/(3600*24)) + "d ago"
                }else if(difference< (3600*24*30*12)){
                    return Math.floor(difference/(3600*24*30)) + "mo ago"
                }else{
                    return Math.floor(difference/(3600*24*30*12)) + "year ago"
                }
                

            }
            let created=postedTime(job.created_at)
            var color = randomColor({
                luminosity: 'bright',
             });
             
            return(
                <div className="col-md-4 " key={job.id}>
                    <Link style={{textDecoration:'none'}}className="" to={{pathname:'/job', state:{data:job, color:color, created:created}}}>
                        <div className="noDecoration">
                    <div className="jobBox"  >
                        <div className="jobIcon" style={{backgroundColor:color}}>
                            <div className="center">
                                <div className="padded">
                                <img src={job.company_logo} height="20px" width="20px" alt=""/>
                                </div>
                            </div>
                            </div>
                        <div className="jobDetails">
                        <p>{created} • {job.type}</p>
                        <h5>{job.title}</h5>
                        <p>{job.company}</p>
                        <p className="jobLocation">{job.location}</p>
                        </div>
                    </div>
                    </div>
                    </Link>
                </div>
            )
        })
        return(
            <div className="container">
            <div className="row">
            {details}
            </div>
            </div>

        )
    }
}
export default Jobs;