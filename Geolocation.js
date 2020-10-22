import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  Grid, FormControl, Input, FormHelperText, OutlinedInput ,Select,Card } from '@material-ui/core';
// import Home from './Home';
// import Map from './Map';
// import { getLatitude, getLongitude, latitudeKeys, longitudeKeys } from 'geolib';
// import {  getPreciseDistance } from 'geolib';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Serviceproservice from "./../Services/serviceproviderService.js";
import historyService from '../Services/historyService.js';
import authservice from '../Services/authservice.js';
import EcoIcon from '@material-ui/icons/Eco';
import RoomIcon from '@material-ui/icons/Room';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import { green } from '@material-ui/core/colors';
import EvStationIcon from '@material-ui/icons/EvStation';
import EmailIcon from '@material-ui/icons/Email';
// import historyService from "./../service/historyService.js";
import DescriptionIcon from '@material-ui/icons/Description';
import CloseIcon from '@material-ui/icons/Close';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const style={
  card:{
      backgroundColor:"black",
      color:"gold",
      marginLeft:50,
      height:"auto",
      width:200,
      marginTop:100
  }
}


export default class GeoLocation extends React.Component{
    constructor(props){
        super(props)
        this.state={
          FilterArr:[],
            latitude:0,
            longitude:0,
            open:true,
            copySuccess: '',
            message:"",
            booking:[],
            serviceType:"",
            vehicleType:"",
            phoneNumber:"",
            id:"",
        };

        this.getLocation=this.getLocation.bind(this);
        this.getCoordinates=this.getCoordinates.bind(this);


        }
        handleClickclose = () => {
          this.setState({
            open: false
          })
           this.props.history.push('/ChoosePrb');

          };

        componentDidMount() {
          const users = authservice.getCurrentUser();
          console.log(users);
          
          if (users) {
            this.setState({
              id:users.id,
            });
          
          }
          }


        copyToClipboard = (e) => {
          this.textArea.select();
          document.execCommand('copy');
          e.target.focus();
          this.setState({ copySuccess: 'Copied Successfully !' });
        };

        componentWillMount(){
          this.getLocation();
        }



        loadService=()=>{
          const{serviceType,vehicleType,phoneNumber}=this.props.location
                console.log(serviceType);

                Serviceproservice.getfilter(serviceType,vehicleType,this.state.latitude,this.state.longitude)
           .then((res)=>{

                console.log(res);
                console.log(res.data);
                this.setState({
                    FilterArr:res.data,
                    serviceType:serviceType,
                    vehicleType:vehicleType
                  });
            
            })
            .catch(error=> {
              console.log(error);
            })
              this.setState({
            open:false
              })
                }


                savebooking=(companyName)=> {   
                  const booking={
                          "userid":this.state.id,
                          "serviceStationName":companyName,
                          "serviceType":this.state.serviceType,
                          "vehicleType":this.state.vehicleType,
                          "phoneNumber":this.state.phoneNumber

                  }
                  console.log(booking)
              historyService.saveHIstory(booking)
               .then(res => {
                  console.log(res);
                  this.setState({message : 'Booking successfully.'});
                  //  this.props.history.push('/booke');
                //    alert('booking successful');

                })
                .catch(error=>{
                  this.setState({message : 'Failed to add Booking'});
                });

                
                console.log(this.state.booking);

                  }





         getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(this.getCoordinates ,this.handleLocationError);
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          }
          getCoordinates(position){
              this.setState({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude,
             // open:false
              })

          }
          handleLocationError(error){
           switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
                default:
                alert("An unknown error occurred.")

           }
          }
          render(){
         const rows = this.state.FilterArr;
     


            return(
                <div>

          {/* <div>
        {

         document.queryCommandSupported('copy') &&
          <div>
            <Button variant="contained" color="primary"
            onClick={this.copyToClipboard}>Copy </Button>
           <Alert variant="filled">{this.state.copySuccess}</Alert>
          </div>
        }
        <form>
          <textarea  disabled
            ref={(textarea) => this.textArea = textarea}
            value={`${this.state.latitude},${this.state.longitude}`}
          />
        </form>

      </div> */}



<div  >
<Card style={{marginTop:"1%",backgroundColor:"gold"}} >
      <CardContent style={{display:"flex"}}>
      <DirectionsRunIcon style={{color:green,fontSize:70}}/>
<FormControl variant="outlined"style={{marginLeft:"4%"}} >
                                  <InputLabel htmlFor="Price">Latitude</InputLabel>
                                  <OutlinedInput
                                  disabled
                                  endAdornment={
                                    <InputAdornment position="end">
                                 <RoomIcon style={{color:"green"}}/>
                                    </InputAdornment>}
                                    type="number"
                                      id="latitude"
                                      value={this.state.latitude}
                                      label="latitude"
                                  />

                              </FormControl>

<EmojiTransportationIcon style={{color:green,fontSize:70,marginLeft:"8%"}}/><h2>FIND THE SERVICE STATIONS</h2>< EvStationIcon style={{color:green,fontSize:70}}/>
                        

                                             <FormControl variant="outlined" style={{marginLeft:"10%"}}>
                                            
                                                 <InputLabel htmlFor="longitudee"> Longitude</InputLabel>
                                                 <OutlinedInput
                                                 disabled
                                                 endAdornment={
                                                   <InputAdornment position="end">
                                                <RoomIcon style={{color:"green"}}/>
                                                   </InputAdornment>}
                                                   type="number"
                                                     id="longitude"
                                                     value={this.state.longitude}

                                                     label="longitude"

                                                 />
                                                 </FormControl>
                                                 </CardContent></Card>


          {/* <Button  variant="contained" color="secondary" href="https://www.google.lk/maps/dir/9.67587,+80.02327//@9.6785929,79.9532459,12z/data=!4m7!4m6!1m3!2m2!1d80.02327!2d9.67587!1m0!3e0">FIND YOUR WAY</Button> */}

          </div>



      <Dialog
  open={this.state.open}

  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>



  <DialogTitle style={{backgroundColor:"green",height:10}} id="alert-dialog-title">{""}<Button style={{width:10}}  ><CloseIcon onClick={this.handleClickclose}  style={{marginLeft:900,marginTop:-20,color:"whitesmoke"}}/></Button></DialogTitle>
  <DialogContent style={{height:50,width:500,display:"flex"}}>

		 <EcoIcon style={{height:35,width:50,color:"green"}} /><h3 style={{fontSize:15}}>Do you want to find the servicestations?</h3>
    
  </DialogContent>
  <DialogActions>
	<Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={this.loadService} color="primary">
	  Yes
  </Button>


  </DialogActions>
</Dialog>








      {/* <div style={{display:"flex"}}> */}
      <Card style={{marginTop:"1%",backgroundColor:"black"}} >
      <CardContent >
      
{/* 
      <Grid item xs={12} style={{display:"flex"}}> */}
            <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
                    {rows.map((row) => (
                        <div>

                                {/* <Card style={style.card}>
                                <p><b>{row.companyName}</b></p>
                                <p>{row.description}</p>
                                <p>{row.emailAddress}</p> */}


{/* <Grid container spacing={2000}> */}

<Card style={{marginLeft:50,marginTop:50, backgroundColor:"gold",color:"black",width:400
 
    
  }} >
    
     
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <EmojiTransportationIcon style={{color:green,fontSize:35,marginLeft:"2%"}}/> <h2 style={{fontSize:20}}><b><i>{row.companyName}</i></b></h2>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
         
         <h3> <DescriptionIcon style={{color:"green",fontSize:30,marginLeft:"1%"}}/>&nbsp;&nbsp;Description&nbsp;-&nbsp;{row.description}</h3>
         <h3><EmailIcon style={{color:"green",fontSize:30,marginLeft:"1%"}}/>&nbsp;&nbsp;EmailAddress&nbsp;-&nbsp;{row.emailAddress}</h3> 
          </Typography>
        </CardContent>
    
      <CardActions>
        <Button variant="outlined"  href="/timer"  style={{color:"white",background:"green"}} onClick={()=>this.savebooking(row.companyName)} >book now</Button>
      </CardActions>
   
                                </Card>
                                
                                {/* </Grid>    */}
                        </div>
                            ))}
            {/* </div> */}
         </Grid>
         
</CardContent></Card>

                </div>
            )
        }
    }
