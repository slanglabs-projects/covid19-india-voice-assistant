import moment from 'moment';
import {selectedLocale} from './slangInit';

export const replyValues = ({
  caseFor,
  dataTypeQuery,
  districtQuery,
  stateQuery,
  orderQuery,
  newQuery,
  number,
  lastUpdate,
  distictZoneColor,
}) => {
  console.info(
    caseFor,
    dataTypeQuery,
    districtQuery,
    stateQuery,
    number,
    lastUpdate,
    distictZoneColor
  );
  if (dataTypeQuery === 'deaths') {
    dataTypeQuery = 'death';
  }
  let updatedSince = null;
  let hindiLastUpdated = null;
  if (lastUpdate) {
    const dateFormat =
      lastUpdate.length > 10 ? 'DD/MM/YYYY hh:mm:ss' : 'DD/MM/YYYY';
    updatedSince = moment(lastUpdate, dateFormat).fromNow().toString();
    hindiLastUpdated = moment(lastUpdate, dateFormat).format(
      'MMMM Do YYYY, h:mm a'
    ); // April 23rd 2020, 2:20:32 pm
  }

  switch (caseFor) {
    case 'replyWithOrder':
      return (
        'The state with the ' +
        orderQuery +
        ' ' +
        dataTypeQuery +
        ' cases in India is ' +
        stateQuery +
        ' with ' +
        number +
        ' cases'
      );
    case 'replyWithDistricts':
      if (selectedLocale === 'hi-IN') {
        return (
          districtQuery +
          ' में ' +
          (newQuery ? 'नए ' : '') +
          ' पुष्ट मामलो की संख्या ' +
          number +
          ' है। ' +
          (newQuery && hindiLastUpdated
            ? ` आख़री अप्डेट का समय ${hindiLastUpdated}`
            : '')
        );
      }
      return (
        (newQuery ? 'New confirmed' : 'Confirmed') +
        ' cases in ' +
        districtQuery +
        ' are ' +
        number +
        (newQuery && updatedSince ? ` , updated ${updatedSince} ` : '') +
        (distictZoneColor ? `. It is a ${distictZoneColor} zone. ` : '')
      );
    case 'replyWithStates':
      if (selectedLocale === 'hi-IN') {
        switch (dataTypeQuery) {
          case 'active':
            return (
              stateQuery +
              ' में ' +
              (newQuery ? 'नए ' : '') +
              ' ऐक्टिव कसेस की संख्या ' +
              number +
              ' है! ' +
              (newQuery && hindiLastUpdated
                ? `आख़री अप्डेट का समय ${hindiLastUpdated}`
                : '')
            );
          case 'confirmed':
            return (
              stateQuery +
              ' में ' +
              (newQuery ? 'नए ' : '') +
              ' पुष्ट मामलो की संख्या ' +
              number +
              ' है! ' +
              (newQuery && hindiLastUpdated
                ? ` आख़री अप्डेट का समय ${hindiLastUpdated}`
                : '')
            );
          case 'recovered':
            return (
              stateQuery +
              ' में ' +
              (newQuery ? 'नए ' : '') +
              ' स्वस्थ होनेवाले मामलों की संख्या ' +
              number +
              ' है! ' +
              (newQuery && hindiLastUpdated
                ? ` आख़री अप्डेट का समय ${hindiLastUpdated}`
                : '')
            );
          case 'death':
            return (
              stateQuery +
              ' में ' +
              number +
              (newQuery ? ' नए' : '') +
              ' लोगो की मौत हो चुकी हैं! ' +
              (newQuery && hindiLastUpdated
                ? ` आख़री अप्डेट का समय ${hindiLastUpdated}`
                : '')
            );
          default:
            console.log('data type not found');
            break;
        }
      }

      if (stateQuery.trim().toLowerCase() === 'india') {
        return (
          (newQuery ? 'New ' : '') +
          dataTypeQuery +
          ' cases in ' +
          stateQuery +
          ' are ' +
          number +
          (newQuery && updatedSince ? ` , updated ${updatedSince}` : '')
        );
      }

      return (
        (newQuery ? 'New ' : '') +
        dataTypeQuery +
        ' cases in the state of ' +
        stateQuery +
        ' are ' +
        number +
        (newQuery && updatedSince ? ` , updated ${updatedSince}` : '')
      );
    case 'noDataDistrict':
      if (selectedLocale === 'hi-IN') {
        return 'माफ़ करिये ।अभी हमारे पास ज़िला स्तर पर ख़ाली पुष्ट मामलों की संख्या है';
      } else {
        return 'Sorry. Data is available only for confirmed cases currently at a district level';
      }
    case 'noDataState':
      if (selectedLocale === 'hi-IN') {
        return 'माफ़ करिये अभी हमारे पास इस का उत्तर नहीं है।';
      } else {
        return "We couldn't find data for your query.";
      }

    default:
      return false;
  }
};
