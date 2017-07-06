import {
    Dispatcher
} from './flux/Dispatcher';
import {
    UserPrefsStore
} from './flux/UserPrefsStore';
import {
    TasksStore
} from './flux/TasksStore';

console.log("Tasks - create tasksDispatcher = new Dispatcher()");
const tasksDispatcher = new Dispatcher();

console.log("Tasks - create tasksStore = new TasksStore(tasksDispatcher)");
const tasksStore = new TasksStore(tasksDispatcher);


const CREATE_TASKS = 'CREATE_TASKS';
const COMPLETE_TASKS = 'COMPLETE_TASKS';
const SHOW_TASKS = 'SHOW_TASKS';

const createNewTaskAction = function (content) {
    console.log("Tasks - createNewTaskAction()");
    //return action object
    return {
        type: CREATE_TASKS,
        value: content
    };
}

const showTasksAction = function (show) {
    console.log("Tasks - showTasksAction()");
    //return action object
    return {
        type: SHOW_TASKS,
        value: show
    };
}

const completeTasksAction = function (id, isComplete) {
    console.log("Tasks - completeTasksAction()");
    //return action object
    return {
        type: COMPLETE_TASKS,
        id,
        value: isComplete
    };
}

const TaskComponent = ({
    content,
    complete,
    id
}) => {
    console.log("Tasks - TaskComponent = ({content, complete, id})");

    //this is kept in round bracket , so that whatever is pass will be returned automatically
    return `<section>
        ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}> 
    </section>`
}


const render = () => {
    console.log("Tasks - render()");

    const tasksSection = document.getElementById('tasks');

    console.log("Tasks - render() - tasksStore.getState()");
    const state = tasksStore.getState();

    //html that the tasks are going to be represented by on the page
    //Example of map()
    //var numbers = [1, 4, 9];
    //var roots = numbers.map(Math.sqrt);
    //roots is now [1, 2, 3]
    //numbers is still [1, 4, 9]
    //so get the filtered task , and execute the taskcomponent function on each tasks 
    const rendered = state.tasks
        .filter(task => state.showComplete ? true : !task.complete) //if showComplete = true,then return all tasks, else only return tasks that are not complete
        .map(TaskComponent)//somecollection.map(fnToExecuteOnEachValueOfCollection)
        .join(""); //The join() method joins all elements of an array (or an array-like object) into a string.

    tasksSection.innerHTML = rendered;

    /* Add listeners to newly generated checkboxes */
    document.getElementsByName('taskCompleteCheck').forEach(element => {
        element.addEventListener('change', (e) => {
            console.log("Tasks - render() - taskCompleteCheck forEach() - element.addEventListener(change)");
            const id = e.target.attributes['data-taskid'].value;
            const checked = e.target.checked;
            tasksDispatcher.dispatch(completeTasksAction(id, checked));
        })
    });
};

//Add New task event - attach submit event to newTask HTML form element defined in tasks.html 
document.forms.newTask.addEventListener('submit', (e) => {
    console.log("Tasks - forms.newTask.addEventListener(submit)");
    e.preventDefault();

    //here e.target = html form newTask defined inside tasks.html
    //here e.target.newTaskName.value = represent new task value(name) to be added
    const name = e.target.newTaskName.value;

    //if name is truthy here -- like it's not undefined and not an empty string
    if (name) {
        console.log("Tasks - forms.newTask.addEventListener(submit) - tasksDispatcher.dispatch(createNewTaskAction(name))");

        //dispatch new create tasks action
        tasksDispatcher.dispatch(createNewTaskAction(name));

        //reset the input for new tasks textbox, so the user can enter a new one
        e.target.newTaskName.value = null;
    }
});

//Add Show Complete event - attach change event to showComplete HTML checkbox element defined in tasks.html
document.getElementById(`showComplete`).addEventListener('change', ({
    target
}) => {
    console.log("Tasks - getElementById(showComplete).addEventListener(change)");
    const showComplete = target.checked;

    console.log("Tasks - getElementById(showComplete).addEventListener(change) - tasksDispatcher.dispatch(showTasksAction(showComplete))");
    tasksDispatcher.dispatch(showTasksAction(showComplete));
});

//Add Undo Action event -- attach submit event to undo HTML form element defined in tasks.html
document.forms.undo.addEventListener('submit', (e) => {
    console.log("Tasks - forms.undo.addEventListener(submit)");
    e.preventDefault();

    console.log("Tasks - forms.undo.addEventListener(submit) - tasksStore.revertLastState()");
    tasksStore.revertLastState();
})

//tasksDispatcher.dispatch('TEST_DISPATCH');
tasksStore.addListner(() => {
    console.log("Tasks - tasksStore.addListner()");
    render();
});

render();