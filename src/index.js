import {setProps} from './voice/utils';
import getCovid19Data from './voice/getCovid19Data';

function SlangInterface(newProps) {
  const {
    onHighlightDistrict = () => {},
    onHighlightState = () => {},
    onDistrictFound = () => {},
    onStateFound = () => {},
    onCountryFound = () => {},
  } = newProps;

  setProps.actions = {
    onHighlightDistrict,
    onHighlightState,
    onDistrictFound,
    onStateFound,
    onCountryFound,
  };

  getCovid19Data();

  return null;
}
const Covid19VoiceAssistant = SlangInterface;
export default Covid19VoiceAssistant;
