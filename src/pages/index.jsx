import { useState } from 'react';
import { useTodo } from '../hooks/todoContainer';

import style from '../inline.css';

function Index() {
  const [sortBy, setSortBy] = useState('asc');

  const {
    state,
    handleInput,
    dispatchAdd,
    toggleEdit,
    dispatchSave,
    dispatchDone,
    dispatchDelete,
    dispatchClear } = useTodo();

  const handleSorting = (e) => e.target.value === 'asc' ? setSortBy('asc') : setSortBy('desc');

  // render list with conditional
  const handleList = () => {
    let taskList = state.tasks.filter(item => item.data.isDone === false && item.data.isDeleted === false).sort((a, b) => a.data.title.toLowerCase() < b.data.title.toLowerCase() ? -1 : 1);

    if (sortBy === 'desc') {
      taskList = taskList.reverse();
    }

    if (taskList.length > 0) {
      const items = taskList.map(item => {
        return (
          <li key={item.id} style={style.li}>
            {item.data.title}
            <div>
              <button onClick={() => toggleEdit(item.id)} style={style.button.primary}>edit</button>{" "}
              <button onClick={() => dispatchDone(item.id)} style={style.button.success}>done</button>
            </div>
          </li>)
      })

      return <ul style={style.ul}>{items}</ul>
    } else {
      return (<div style={{ textAlign: "center" }}>nothing to do right now -__-"</div>)
    }
  }

  const handleCompletedList = () => {
    let taskList = state.tasks.filter(item => item.data.isDone === true && item.data.isDeleted === false).sort((a, b) => a.data.title.toLowerCase() < b.data.title.toLowerCase() ? -1 : 1);

    if (taskList.length > 0) {
      const items = taskList.map(item => {
        return (
          <li key={item.id} style={style.li}>
            {item.data.title}
            <div>
              <button onClick={() => dispatchDelete(item.id)} style={style.button.danger}>remove</button>
            </div>
          </li>)
      })

      return <ul style={style.ul}>{items}</ul>
    } else {
      return (<div style={{ textAlign: "center" }}>no completed task yet o__o</div>)
    }
  }

  return (
    <section>
      <div style={style.container}>
        <div>
          <h2>todo</h2>
        </div>

        {/* input */}
        <form style={{ display: "flex", justifyContent: "space-between" }} onSubmit={(e) => e.preventDefault()}>
          <input type="text" maxLength="100" placeholder={`${state.isEditing ? 'edit' : 'add'} your to do list`} onChange={(e) => handleInput(e)} value={state.title} style={{ width: "55%" }}></input>
          <div>
            {
              state.isEditing ? (
                <>
                  <button onClick={() => dispatchSave()} type="submit" style={style.button.primary}>save</button>{" "}
                  <button onClick={() => toggleEdit()} style={style.button.danger}>cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => dispatchAdd()} type="submit" style={style.button.primary}>add task</button>
                  {/* <button onClick={() => dispatchClear()} style={style.button.danger}>clear all</button> */}
                </>
              )
            }
          </div>
        </form>

        {/* filter section */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px" }}>
          <div>
            <h3 style={{ margin: "0" }}>ongoing task</h3>
          </div>
          <div onChange={(e) => handleSorting(e)}>
            <select name="" id="">
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>

        {/* list container */}
        <div style={{ marginTop: "24px" }}>
          {handleList()}
        </div>

        {/* completed task header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px" }}>
          <div>
            <h3 style={{ margin: "0" }}>completed task</h3>
          </div>
        </div>

        {/* completed list container */}
        <div style={{ marginTop: "24px" }}>
          {handleCompletedList()}
        </div>

      </div>
    </section>
  );
}

export default Index;