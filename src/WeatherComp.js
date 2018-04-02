import React, { Component } from 'react';

var cityWeather = [];
var currentCity = 0;

class WeatherComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: '',
            temp: 0,
            humidity: 0,
            wind: 0
        }
    }

    fetchData() {
        var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        var apiUrl = '&appid='; //your personal api key here
        var place = 'London';
        var self = this;

        fetch(rootUrl + place + apiUrl)
            .then(function(response) {
                return response.json()
            }).then(function(data) {
                cityWeather[currentCity] = data;
                self.updateData(data);
            })
    }

    updateData() {
        this.setState({
            weather: cityWeather[currentCity].weather[0].id,
            temp: Math.round(cityWeather[currentCity].main.temp - 273.15),
            humidity: Math.round(cityWeather[currentCity].main.humidity),
            wind: cityWeather[currentCity].wind.speed
        })
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        var weatherClass = "wi wi-owm-" + this.state.weather;
        return (
            <div>
                <i className={weatherClass} ></i>
                <h1>Testing</h1>
            </div>
        );
    }
}

export default WeatherComp;
