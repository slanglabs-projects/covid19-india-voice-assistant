import axios from 'axios';
import slangIntentToAction from './index';
import {setProps} from './utils';

const getCovid19Data = async () => {
  try {
    const [
      response,
      stateDistrictWiseResponse,
      stateTestResponse,
      {data: districtZones},
    ] = await Promise.all([
      axios.get('https://api.covid19india.org/data.json'),
      axios.get('https://api.covid19india.org/state_district_wise.json'),
      axios.get('https://api.covid19india.org/state_test_data.json'),
      axios.get('https://api.covid19india.org/zones.json'),
    ]);
    setProps.states = response.data.statewise;
    setProps.stateDistrictWiseData = stateDistrictWiseResponse.data;
    setProps.stateTestData = stateTestResponse.data.states_tested_data.reverse();
    setProps.districtZones = districtZones.zones;
    slangIntentToAction(setProps);
  } catch (err) {
    console.log(err);
  }
};

export default getCovid19Data;
