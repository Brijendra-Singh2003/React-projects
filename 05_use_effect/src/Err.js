import classes from "./Err.module.css"

export default function Err({seterr}) {
    return(
        <>
        <div className={classes.back} onClick={()=>{seterr(false)}}></div>
        <div className={classes.main}>
            <h1 className={classes.title}>ALERT</h1>
            <p className={classes.dis}>All fields are compulsary</p>
            <button className={classes.btn} onClick={()=>{seterr(false)}}>OKAY</button>
        </div>
        </>
    )
}