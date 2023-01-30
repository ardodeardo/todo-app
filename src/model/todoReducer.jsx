import React, { useReducer } from 'react'

const initialState = {
  title: "",
  tasks: [],
  isEditing: false,
  onEdit: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'fillup_tasks': {
      const { payload } = action;

      return {
        ...state,
        tasks: payload
      }
    }

    case 'input_change': {
      const { title } = action.payload;

      return {
        ...state,
        title: title
      }
    }
    case 'add': {
      const { tasks } = action.payload;

      return {
        ...state,
        title: "",
        tasks: tasks
      }
    }
    case 'toggle_edit': {
      const { payload } = action;

      return {
        ...payload
      }
    }
    case 'save': {
      const { payload } = action;

      return {
        ...state,
        title: "",
        isEditing: false,
        tasks: payload,
        onEdit: {}
      }
    }
    case 'mark_done': {
      const { payload } = action;

      return {
        ...state,
        tasks: payload
      }
    }
    case 'delete': {
      const { payload } = action;

      return {
        ...state,
        tasks: payload
      }
    }
    case 'clear': {
      return {
        ...initialState
      }
    }
  }

  throw Error(`unknown action ${action.type}`);
}


function TodoReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}

export default TodoReducer