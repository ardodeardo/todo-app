// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import style from '../inline.css';

function Index() {
  const initialTodos = {
    counter: 1,
    list: []
  }

  const initialForm = {
    title: "",
    isEditing: false,
    onEdit: {}
  }

  const [todos, setTodos] = useState(initialTodos);
  const [form, setForm] = useState(initialForm);

  const resetForm = () => {
    setForm(initialForm);
  }

  const handleInput = (e) => {
    const title = e.target.value;

    setForm(prevState => ({ ...prevState, title: title }));
  }

  // inserting value on list of state
  const handleAdd = () => {
    const { title } = form;

    if (title.length > 2) {
      resetForm();

      const nextId = todos.counter + 1;

      const newTodos = [
        ...todos.list,
        {
          id: nextId,
          title: form.title,
          done: false
        }
      ]

      setTodos(prevState => ({
        ...prevState, counter: nextId, list: newTodos
      }));
    }
  }

  // reset todos state value
  const handleClear = () => {
    setTodos(initialTodos);
    resetForm();
  }

  // removing value from list of state
  const handleDelete = (id) => {
    const { list } = todos;

    const temp = list.filter(item => item.id !== id);

    setTodos(prevState => ({
      ...prevState, list: [...temp]
    }))
  }

  const toggleEdit = (id = null) => {
    if (id !== null) {
      const { list } = todos;

      const getTodo = list.filter(item => item.id === id);

      if (getTodo.length !== 0) {
        const { id, title } = getTodo[0];

        setForm(prevState => ({
          ...prevState,
          title: title,
          onEdit: {
            id: id,
            title: title
          }
        }));
      }
    }

    setForm(prevState => ({ ...prevState, isEditing: !form.isEditing }));
  }

  // update task by specific id
  const handleSave = () => {
    const { title, isEditing, onEdit } = form;

    if (isEditing) {
      // if there is a change on the title, then proceed save
      if (title !== onEdit.title && title.length > 2) {
        const updatedList = todos.list.map(item => {
          if (item.id === onEdit.id) {
            return {
              id: item.id,
              title: title
            };
          } else {
            return item;
          }
        })

        setTodos(prevState => ({
          ...prevState,
          list: [
            ...updatedList
          ]
        }));

        setTimeout(() => {
          setForm(prevState => ({
            ...prevState,
            title: "",
            isEditing: false
          }))
        }, 100);
      }
    }
  }

  // render list with conditional
  const handleList = () => {
    const { list } = todos;

    if (list.length > 0) {
      const items = todos.list.map((item, index) => {
        return (
          <li key={`${item.title}${index}`} style={style.li}>
            {item.title}
            <div>
              <button onClick={() => toggleEdit(item.id)} style={style.button.primary}>edit</button>{" "}
              <button onClick={() => handleDelete(item.id)} style={style.button.danger}>remove</button>
            </div>

          </li>)
      })

      return <ul style={style.ul}>{items}</ul>
    } else {
      return (<div style={{ textAlign: "center" }}>nothing to do right now :o</div>)
    }
  }

  return (
    <section>
      <div style={style.container}>

        {/* input */}
        <form style={{ display: "flex", justifyContent: "space-between" }} onSubmit={(e) => e.preventDefault()}>

          <input type="text" maxLength="100" placeholder={`${form.isEditing ? 'edit' : 'add'} your to do list`} onChange={(e) => handleInput(e)} value={form.title} style={{ width: "55%" }}></input>
          <div>
            {
              form.isEditing ? (
                <>
                  <button onClick={() => handleSave()} type="submit" style={style.button.primary}>save</button>{" "}
                  <button onClick={() => toggleEdit()} style={style.button.danger}>cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAdd()} type="submit" style={style.button.primary}>add task</button>{" "}
                  <button onClick={() => handleClear()} style={style.button.danger}>clear all</button>
                </>
              )
            }
          </div>
        </form>


        {/* list container */}
        <div style={{ marginTop: "24px" }}>
          {handleList()}
        </div>
      </div>
    </section>
  );
}

export default Index;
