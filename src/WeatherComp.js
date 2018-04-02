import React, { Component } from 'react';

class WeatherComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
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
            self.setState({ data }, () => console.log(self.state));
            })
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
    return (
    <div>
    <h1>Testing</h1>
    </div>
    );
    }
}

export default WeatherComp;
