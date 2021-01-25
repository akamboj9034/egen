
import Nav from "./Nav";
import DOMPurify from 'dompurify';
// class JobDetail extends Component{
//     render(){
//         return(
//             <h1>Helo </h1>
//         )
//     }
// }
function JobDetail(props) {
  const job = props.location.state.data;
  
  return (
    <div className="container">
      <Nav />

      <div className="row">
        <div className="col-md-2">
        {/* <Link to="/">
        <button className="btn" id="goBack">
          <i className="fas fa-chevron-circle-left"></i> Go back
        </button>
      </Link> */}
        </div>
        <div className="col-md-8 moveUp">
            <div className="jobBody">
                <div className="jobHeader">
                    <div className="container-fluid">
                    <div className="row" id="jobHeader">
                    <div
                        className="col-md-2 mobileSmallIcon center"
                        style={{ backgroundColor: props.location.state.color }}
                    >
                        <img className="companyImage" src={job.company_logo} width="50px" height="50px" alt=""/>
                    </div>
                    <div className="col-md-7 center">
                        <h2 id="companyTitle" className="">{job.company}</h2>
                    </div>
                    <div className="col-md-3 center">
                        <div className="linkBox ">
                        <a href={job.company_url} target="blank "className="btn classic_btn" id="companyBtn">COMPANY SITE</a>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        <div className="jobDescription">
            <div className="row">
                <div className="col-md-8">
                        <p>{props.location.state.created} • {job.type}</p>
                        <h5>{job.title}</h5>
                        <p>{job.company}</p>
                        <p className="jobLocation">{job.location}</p>
                </div>
                <div className="col-md-4 center">
                    <button className="btn applyButton">Apply Now</button>
                </div>
            <div className="jobData" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.description)}}></div>

            </div>

        
        </div>
            <div className="howToApply" dangerouslySetInnerHTML={{__html: "<h3 id='heading'>How to apply</h3>"+DOMPurify.sanitize(job.how_to_apply)}}></div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
export default JobDetail;
