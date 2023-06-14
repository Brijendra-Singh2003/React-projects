import { useState, useEffect } from "react";
import Width from "./Width"
import Todo from "./todo";
import classes from './App.module.css'
import Err from "./Err";

function App() {

  const [on, setOn] = useState(false);
  const [err, seterr] = useState(false);
  const [list, setList] = useState([]);
  const [item, setItem] = useState({ naam: "", prize: "", img: "", id: 0 });

  useEffect(() => {
    fetch("http://localhost:6069/getlist")
      .catch((err) => {
        console.log("delete item err", err);
      })
      .then((response) => {
        return response.json();
      })
      .then((response, err) => {
        if (response.length !== 0) {
          setItem({ naam: "", prize: "", img: "", id: response[response.length - 1].id + 1 });
          setList(response);
        }
      })
  }, [])

  const toggle = () => {
    setOn(prevState => !prevState);
  };

  const addItem = () => {
    if (item.prize.length === 0 || item.img.length === 0 || item.naam.length === 0) {
      seterr(true);
      return;
    }
      setList(prevList => {
        const newList = [...prevList, item]
        fetch("http://localhost:6069/savelist", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newList)
        }).catch((err) => {
          console.log("add item err", err);
        })
        return newList;
      })
      setItem( prevItem => { return { naam: "", prize: "", img: "", id: (prevItem.id + 1) } });


  }

  const changeItem = (e) => {
    const { name, value } = e.target;
    setItem( prevItem => { return { ...prevItem, [name]: value } });
  }

  const removeItem = (id) => {
    setList((prevList) => {
      const newList = prevList.filter((curr) => {
        return id !== curr.id;
      })
      fetch("http://localhost:6069/savelist", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList)
      }).catch((err) => {
        console.log("delete item err", err);
      })
      if (newList.length === 0) {
        setItem({ naam: "", prize: "", img: "", id: 0 });
      }
      return newList;
    })
  }

  return (
    <div className={classes.App} style={{ fontFamily: "cursive" }}>
      {err && <Err seterr={seterr}/>}
      <div className={classes.nav}>
        <button className={classes.Button} onClick={toggle} >{on ? "HIDE WIDTH" : "SHOW WIDTH"}</button>
        {on && <Width />}
      </div>
      <div className={classes.Input}>
        <input onChange={changeItem} type="text" value={item.naam} name="naam" placeholder="name" />
        <input onChange={changeItem} type="text" value={item.prize} name="prize" placeholder="prize" />
        <input onChange={changeItem} type="text" value={item.img} name="img" placeholder="img link" />
        <button onClick={addItem}>add item</button>
      </div>
      <Todo list={list} setList={removeItem} />
    </div>
  );
}

export default App;