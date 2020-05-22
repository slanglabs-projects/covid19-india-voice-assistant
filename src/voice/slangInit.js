import Slang from 'slang-web-sdk';
import {buddyId, apiKey, hints} from './buddy.js';
// import {hints} from './buddyHelper';
import './slang.css';
import moment from 'moment';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-123830474-3');

// enable or disable logging
const debudOn = localStorage.getItem('slangWeDebug');
const debugLog = () => {
  if (!debudOn) {
    console.log = function () {};
  }
};
debugLog();

export let selectedLocale = localStorage.getItem('slangLocale') || 'en-IN';
const env = 'prod';
let speakOut = false;
let speakText = '';
// set the default selectable locales on the slang trigger
Slang.requestLocales(['en-IN', 'hi-IN']);
Slang.ui.hide(); // Hide slang in load;
// Initialise Slang with the below params
Slang.initialize({
  buddyId,
  apiKey,
  env, // one of ['stage','prod']
  locale: selectedLocale, // one of ['en-IN','hi-IN']
  onSuccess: () => {
    console.info('Slang initialized successfully'); // anything you want to do once slang gets init successfully
    Slang.builtinUi.setConfig({
      overridenOnTriggerClick: async () => {
        const lastUsed = localStorage.getItem('SlangLastUsed' + selectedLocale);
        if (!lastUsed || Number(lastUsed) + 86400000 < Date.now()) {
          speakOut = true;
        } else {
          speakOut = false;
        }
        if (selectedLocale === 'hi-IN') {
          speakText =
            "आपका स्वागत है. अब अपने ज़िले में CoVid19 के पुष्ट मामलों की संख्या खोजने के लिए ज़िले का नाम बोले, जैसे की 'मुंबई'";
        } else {
          speakText =
            "Welcome. Now search for confirmed CoVid19 cases in your district by saying the district name, like 'Mumbai'";
        }
        Slang.startConversation(speakText, speakOut);
        localStorage.setItem('SlangLastUsed' + selectedLocale, Date.now());
      },
    });
  },
  onFailure: () => {
    console.info('Slang Failed to initialize'); // anything you want to do once slang fails to init
  },
});

// arrays of ASR biasing words for each locale

// set the above hints
Slang.setASRHints(hints);

const uiObs = (UIState) => {
  if (
    UIState.selectedLocale !== '' &&
    UIState.selectedLocale !== selectedLocale
  ) {
    selectedLocale = UIState.selectedLocale;
    localStorage.setItem('slangLocale', selectedLocale);
    Slang.triggerSlang();
    if (selectedLocale.split('-')[0])
      moment.locale(selectedLocale.split('-')[0]);
  }
};
Slang.registerUIObserver(uiObs);
