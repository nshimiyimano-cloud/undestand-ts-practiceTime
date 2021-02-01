// Code goes here!

//axios to use it to send  get request s our request from url
import axios from 'axios';

const form =document.querySelector('form')!;
const addressInputs=document.getElementById('address')! as HTMLInputElement;
// const GOOGLE_API_KEY="6LdZAKwZAAAAADQzT0Y_pbXg4kTDXp6qDwZj1BUK";
const GOOGLE_API_KEY='YOUR_API_KEY';
  
//custom type we'll use in generic type of.get() funct from axios to tell ts that we expect to get Google Geo Coding Response if not this we do response.data from data not known by ts u get error

type GoogleGeoCodingResponse={
    results:{geometry:{location:{lat:number,lng:number}}}[];
    status:'OK' | 'ZERO_RESULTS';
};


function searchAddressHandler(event:Event){
    event.preventDefault();
    const enteredAddress=addressInputs.value;
    //we need to send this to Google's API
    axios.get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI( enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response=>{
        if(response.data.status !== 'OK'){
            throw new Error('could not fetch location');
        }

        const coordinate=response.data.results[0].geometry.location;     //to get(lat,lang)
        console.log(coordinate)
        console.log(response);
    }).catch(error=>{
        alert(error.message)
        console.log(error);
    })
}
form.addEventListener('submit',searchAddressHandler);
