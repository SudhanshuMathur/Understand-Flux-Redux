import {Dispatcher} from './flux/Dispatcher';
import {UserPrefsStore} from './flux/UserPrefsStore';

//Initialise Dispatcher
const controlPanelDispatcher = new Dispatcher();

//Initialise Store
//here UserPrefsStore dosent have any constructor, but it's base class Store has a consturctor which take dispatcher as input arg.
const objUserPrefsStore = new UserPrefsStore(controlPanelDispatcher);

//Create the Action Object - to Update User Name
const userNameUpdateAction = function (userName) {
    //return action object
    return {
        type: 'UPDATE_USERNAME',
        value: userName
    };
}

//Helper or Callback Method - Dispatcher
//here function input variable objUserNameInput => event - used in order to implement event delegation.
var cbBindUserNameInput = function (objUserNameInput) {
    //console.log('ControlPanel - UserNameInput Bind event callback');
    const userInputNameValue = objUserNameInput.target.value; //username entered in textbox => m,ma,mat,math,mathu,mathur

    //call dispatcher and pass the action(object) to update username 
    const objUserNameUpdateAction = userNameUpdateAction(userInputNameValue);
    controlPanelDispatcher.dispatch(objUserNameUpdateAction);
};

//Helper or Callback Method - Store
var cbStoreListenerState = function (state) {
    console.log('ControlPanel - cbStoreListenerState(state)');

    //This method render the state onto UI
    render(state);

    //Store the current state in HTML5 localstorage 
    localStorage['userPreferences'] = JSON.stringify(state);
};

//method to render the output to the view
const render = function(objCurrentState){
    document.getElementById('userName').innerText = objCurrentState.userName;
}

//Add the listener(state) as callback to Store.. we pass the callback function (cbStoreListenerState) as listener
objUserPrefsStore.addListner(cbStoreListenerState);


//Bind Event to the element & assign action to Dispatcher by calling callback function = cbBindUserNameInput
//the 1st input param 'input' => type = A string representing the event type to listen out for.
//the 2nd input param cbBindUserNameInput => listener = The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs. 
//contd.. the 2nd input param cbBindUserNameInput => This must be an object implementing the EventListener interface, or a JavaScript function.
document.getElementById('userNameInput').addEventListener('input', cbBindUserNameInput);


//This is done, when page is reloaded, get the values from store and display it on view(page)
render(objUserPrefsStore.getUserPreferences());