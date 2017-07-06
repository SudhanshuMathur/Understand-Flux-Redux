import { ReduceStore } from './ReduceStore';
import { generate as id } from 'shortid'; //library to generate randon id's'

export class TasksStore extends ReduceStore {

    //override method of the base class(Store) 
    getInitialState() {
        console.log("TasksStore - getInitialState()");
        return {
            tasks: [{
                id: id(),
                content: "Update CSS styles",
                complete: false
            }, {
                id: id(),
                content: "Add unit tests",
                complete: false
            }, {
                id: id(),
                content: "Post to social media",
                complete: false
            }, {
                id: id(),
                content: "Install hard drive",
                complete: true
            }],

            showComplete: true
        };
    }

    //new method of the class
    getState() {
        console.log("TasksStore - getState()");
        return this.__state;
    }

    //Reduce method always return either the "existing state" or "copy of state".They cant just return nothing
    reduce(state, action) {

        //here state => Object {tasks: Array[4], showComplete: true}
        //here action => Object {type: "CREATE_TASKS", value: "add sud"}
        console.log("TasksStore - reduce(state,action) ");

        let newState;

        switch (action.type) {
            case 'CREATE_TASKS': //TODO: make this as constant 
                console.log("TasksStore - reduce(state,action) - switch CREATE_TASKS");

                //'...' is spread operator - allows an expression to be expanded in places where multiple arguments/elements/variables are expected.
                //ex - function calls -> myFunction(...iterableObj)
                //ex - array literals -> [...iterableObj, 4, 5, 6];
                //ex - object literals -> let objClone = { ...obj }; --> Shallow-cloning (excluding prototype) 
                //to copy all the properties of that object from state.
                //This will create a copy of our object with a copy of the array as well.
                // Otherwise it would be a new object but the same array and we'd be accidently mutating our array if we changed it.
                newState = { ...state, tasks: [...state.tasks] }; // newState => Object {tasks: Array[4], showComplete: true}

                //add that new task to the tasks array of newState object
                newState.tasks.push({
                    id: id(),
                    content: action.value, // action.value = test sud -- the value of the newly added tasks entered in UI
                    complete: false
                });
                return newState; //return new state

            case 'SHOW_TASKS': //TODO: make this as constant 
                console.log("TasksStore - reduce(state,action) - switch SHOW_TASKS");

                //'...' is spread operator - allows an expression to be expanded in places where multiple arguments/elements/variables are expected.
                //ex - function calls -> myFunction(...iterableObj)
                //ex - array literals -> [...iterableObj, 4, 5, 6];
                //ex - object literals -> let objClone = { ...obj }; --> Shallow-cloning (excluding prototype) 
                //to copy all the properties of that object from state.
                // But update the showComplete value in the newState
                newState = { ...state, showComplete: action.value };  // action.value = true of false based upon checkbox for Show completed
                return newState;


            case 'COMPLETE_TASKS': //TODO: make this as constant 
                console.log("TasksStore - reduce(state,action) - switch COMPLETE_TASK");

                //'...' is spread operator - allows an expression to be expanded in places where multiple arguments/elements/variables are expected.
                //ex - function calls -> myFunction(...iterableObj)
                //ex - array literals -> [...iterableObj, 4, 5, 6];
                //ex - object literals -> let objClone = { ...obj }; --> Shallow-cloning (excluding prototype) 
                //to copy all the properties of that object from state.
                //This will create a copy of our object with a copy of the array as well.
                // Otherwise it would be a new object but the same array and we'd be accidently mutating our array if we changed it.
                newState = { ... state, tasks: [...state.tasks] };

                //find the index of whatever the completed task was by matching the id's.
                const affectedElementIndex = newState.tasks.findIndex(t => t.id === action.id);

                //Update the tasks array of the new state 
                newState.tasks[affectedElementIndex] = { ... state.tasks[affectedElementIndex], complete: action.value }
                return newState;
        }

        return state;
    }
}