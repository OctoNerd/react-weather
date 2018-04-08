import React, { Component } from 'react';

var cityWeather = [];
var currentCity = 0;

class WeatherComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: '',
            temp: 0,
            tempF: 0,
            humidity: 0,
            wind: 0,
            cityName: ''
        }
    }

    fetchData() {
        var rootUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
        var apiUrl = '&appid=370e5a15bcbb7093fad4ad07080275c3'; //your personal api key here
        var place = 'Portland';
        var self = this;

        fetch(rootUrl + place + apiUrl)
            .then(function(response) {
                return response.json()
            }).then(function(data) {
                cityWeather[currentCity] = data;
                console.log(data);
                self.updateData(data);
            })
    }

    updateData() {
        this.setState({
            weather: cityWeather[currentCity].weather[0].id,
            temp: Math.round(cityWeather[currentCity].main.temp - 273.15),
            humidity: Math.round(cityWeather[currentCity].main.humidity),
            wind: Math.round(cityWeather[currentCity].wind.speed),
            cityName: cityWeather[currentCity].name
        });
        this.convertCtoF();
    }

    convertCtoF() {
        var tempF = Math.round((this.state.temp * 9 / 5) + 32);
        this.setState({ tempF: tempF });
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        var weatherClass = "wi wi-owm-" + this.state.weather;
        var bgColorClass = "weather-widget ";

        //Get background color classname
        if (this.state.temp >= 30) {
            bgColorClass += "very-warm";
        }
        else if(this.state.temp < 30 && this.state.temp >= 20) {
            bgColorClass += "warm";
        }
        else if(this.state.temp < 20 && this.state.temp >= 10) {
            bgColorClass += "neutral";
        }
        else if (this.state.temp < 10 && this.state.temp >= 0) {
            bgColorClass += "cold";
        }
        else if (this.state.temp < 0) {
            bgColorClass += "very-cold";
        }

        return (
            <div className={bgColorClass}>
                <h1 className="cityname">{this.state.cityName}</h1>
                <div className="weather">
                    <i className={weatherClass} ></i>
                </div>
                <section className="weather-details">
                    <div className="temp">
                        <i className="temp-number">{this.state.tempF}</i>
                        <i className="wi wi-degrees"></i>
                    </div>
                    <div className="wrap">
                        <div className="humidity">
                            <i className="wi wi-raindrop"></i> {this.state.humidity} %
                        </div>
                        <div className="wind">
                            <i className="wi wi-small-craft-advisory"></i>
                            {this.state.wind} km/h
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default WeatherComp;
