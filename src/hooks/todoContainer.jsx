import React, { createContext, useContext, useEffect } from 'react'
// import { v4 as uuid } from "uuid";

import { fetchData, addData, markDoneData, deleteData, updateData } from "../api";
import TodoReducer from '../model/todoReducer';

const TodoContext = createContext();

function TodoContainer(props) {
  const [state, dispatch] = TodoReducer();

  // component did mount
  useEffect(() => {
    dispatchFillUp();
  }, []);

  const dispatchFillUp = async () => {
    try {
      const response = await fetchData();

      const { status, data } = response;

      if (status === 200) {
        dispatch({
          type: 'fillup_tasks',
          payload: data
        });
      }
    } catch (error) {
      console.log('something went wrong', error)
    }
  }

  const handleInput = (e) => {
    dispatch({
      type: 'input_change',
      payload: {
        title: e.target.value
      }
    })
  }

  // inserting value for task list
  const dispatchAdd = async () => {
    // only insert data when more than 2 chars
    if (state.title.length > 2) {
      // const nextId = uuid();

      const newTask = {
        // id: nextId,
        title: state.title,
        isDone: false,
        isDeleted: false

      }

      const response = await addData(newTask);

      const { status, data } = response;

      if (status === 200) {
        const payload = {
          tasks: [
            ...state.tasks,
            {
              id: data.id,
              data: newTask
            }
          ]
        }

        dispatch({
          type: 'add',
          payload: payload
        })
      }
    }
  }

  const toggleEdit = (id = null) => {
    let payload = {}

    if (id !== null) {
      const selectedTask = state.tasks.filter(item => item.id === id)[0];

      if (Object.keys(selectedTask).length !== 0) {

        const { title, isDone, isDeleted } = selectedTask.data;

        payload = {
          ...state,
          title: title,
          isEditing: true,
          onEdit: {
            id: selectedTask.id,
            data: {
              title: title,
              isDone: isDone,
              isDeleted: isDeleted
            }
          }
        }
      }
    } else {
      payload = {
        ...state,
        title: "",
        isEditing: false,
        onEdit: {}
      }
    }

    dispatch({
      type: 'toggle_edit',
      payload: payload
    })
  }

  // update task by specific id
  const dispatchSave = async () => {
    const { title, onEdit, tasks } = state;

    // if only there was a real change
    if (title !== onEdit.title && title.length > 2) {

      const { isDone, isDeleted } = onEdit.data;

      const updatedTask = {
        id: onEdit.id,
        data: {
          title: title,
          isDone: isDone,
          isDeleted: isDeleted
        }
      }

      const updatedTaskList = tasks.map(item => {
        if (item.id === onEdit.id) {
          return updatedTask
        } else {
          return item
        }
      })

      const response = await updateData(updatedTask);

      const { status, data } = response;

      if (status === 200) {
        const payload = updatedTaskList;

        dispatch({
          type: 'save',
          payload: payload
        })
      }
    }
  }

  const dispatchDone = async (id) => {
    const response = await markDoneData({ id: id });

    const { status, data } = response;

    if (status === 200) {
      const payload = state.tasks.map(item => {
        if (item.id === id) {
          return {
            id: item.id,
            data: {
              ...item.data,
              isDone: true
            }
          }
        } else {
          return item
        }
      })

      dispatch({
        type: 'mark_done',
        payload: payload
      })
    }
  }

  // removing value from task list
  const dispatchDelete = async (id) => {
    const filteredTask = state.tasks.filter(item => item.id !== id);

    const response = await deleteData({ id: id });

    const { status, data } = response;

    if (status === 200) {
      const payload = filteredTask;

      dispatch({
        type: 'delete',
        payload: payload
      })
    }
  }

  // reset todos state value
  const dispatchClear = () => {
    dispatch({
      type: 'clear'
    });
  }

  const value = {
    state,
    handleInput,
    dispatchAdd,
    toggleEdit,
    dispatchSave,
    dispatchDone,
    dispatchDelete,
    dispatchClear,
  }

  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext);

export default TodoContainer