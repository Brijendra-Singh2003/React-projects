import styles from './todo.module.css'
export default function Todo({list, setList}) {    
    return (
    <div className={styles.container}>
        {list.map((item)=> {
            return (
                <div className={styles.card} id={item.id} key={item.id}>
                    <img src={item.img} alt=""/>
                    <div className={styles.dis}>
                        <button>ADD TO CART</button>
                        <button onClick={()=>{setList(item.id)}}>remove item</button>
                    </div>
                    <div className={styles.name}>
                        <h3>{item.naam}</h3>
                        <h3>${item.prize}</h3>
                    </div>
                </div>
            )
        })}
    </div>
    );
}