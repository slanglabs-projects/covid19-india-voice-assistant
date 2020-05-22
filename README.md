
# covid19-india-voice-assistant 

With this voice assistant people can query the latest Covid-19 info in districts/states in India by talking to your website/webapp.

Data source: [https://api.covid19india.org/](https://api.covid19india.org/) 

Demo of the [Covid19 India Voice Assistant](https://demo.slanglabs.in/utils/dist/index.html)

Implementation: [https://covid19india.slanglabs.in/](https://covid19india.slanglabs.in/) 

#### Before you begin

- Ensure your project will use HTTPS and has a valid SSL certificate in production


### Getting Started

Install the package in your project

`$ yarn add covid19-india-voice-assistant`

OR

`$ npm install covid19-india-voice-assistant`


Next `import` the voice assistant in the relevant file in your project

`import Covid19VoiceAssistant from 'covid19-india-voice-assistant';`

If you need to include this directly in an html file, paste the code below before the `</body>` tag

```
<script src="https://demo.slanglabs.in/utils/dist/covid19-india-voice-assistant.js" charset="utf-8"></script>


<link rel="stylesheet" href="https://demo.slanglabs.in/utils/dist/covid19-india-voice-assistant.css">

```


### Advanced Usage (Web Apps Only)

 #### `onDistrictFound`

 This callback is fired once a district in India is found that a user searched for via voice. 

You can pass this as props ( react ) like this.

```
<Covid19VoiceAssistant onDistrictFound = {(district)=> {console.log(district)}} > 

// OR

Covid19VoiceAssistant.onDistrictFound = (district) => { console.log(district) }

```
The `district` object has the requested covid19 data of the district 

 #### `onStateFound`

  This callback is fired once a state in India is found that a user searched for via voice. 
 
You can pass this as props ( react ) like this.

```
<Covid19VoiceAssistant onStateFound = {(state)=> {console.log(state)}} > 

// OR

Covid19VoiceAssistant.onStateFound = (state) => { console.log(state) }

```
The `state` object has the requested covid19 data of the state

## Thanks
#### This voice assistant uses the Covid19 India data source from - [https://api.covid19india.org/](https://api.covid19india.org/) 
You can find the source code here  [https://github.com/covid19india/api](https://github.com/covid19india/api) .


##### Contact

For any queries contact us support@slanglabs.in
