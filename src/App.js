import React from 'react'
import Titles from './components/Titles.js'
import Form from './components/Form.js'
import Weather from './components/Weather'
/*Get API KEY FROM http://api.openweathermap.org*/
const API_KEYS="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

class App extends React.Component{
  state={
    tempareture: '',
    city: '',
    country:'',
    humidity:'',
    pressure:'',
    description:'',
    error:''

  }

    getWeather = async(event) => {
      event.preventDefault();
      const city=event.target.elements.city.value;
      const country=event.target.elements.country.value;
      const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country},uk&appid=${API_KEYS}&units=metric`);
      const data=await api_call.json();
      if(data.cod==200){
        console.log(data);
        if(city && country){
          this.setState({
            tempareture : data.main.tempareture,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity, 
            pressure: data.main.pressure,
            description: data.weather[0].description,
            error:""
          });        
        }else{
          this.setState({
            tempareture: '',
            city: '',
            country:'',
            humidity:'',
            pressure:'',
            description:'',
            error:'Please Select City and Country'
            });
        }        
      }
      else{
        this.setState({
          tempareture: '',
          city: '',
          country:'',
          humidity:'',
          pressure:'',
          description:'',
          error:'No data found for specified City and Country. try something else.'
          });
      }
      
    

    }
  render(){
      return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                  <Titles/>
                  </div>

                  <div className="col-xs-7 form-container">
                          <Form getWeather={this.getWeather}/>
                          <Weather
                            tempareture={this.state.tempareture}
                            city={this.state.city}
                            country={this.state.country}
                            humidity={this.state.humidity}
                            pressure={this.state.pressure}
                            description={this.state.description}
                            error={this.state.error}
                          />
                  </div>
          
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default App