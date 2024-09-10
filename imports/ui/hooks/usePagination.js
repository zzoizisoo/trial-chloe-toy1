import { Meteor } from "meteor/meteor";
import { useState, useEffect } from "react";

export default usePagination = (methodName, from, count) => { 
    const [result, setResult] = useState([]);

    useEffect(()=>{
        let ignore = false;
        Meteor.callAsync(methodName, from, count).then((res, err) =>{ 
            if(!ignore) { 
                setResult([...result, ...res])
            }
        })
        return ()=>{
            ignore = true
        }
    }, [methodName, from, count])
    return result;
}