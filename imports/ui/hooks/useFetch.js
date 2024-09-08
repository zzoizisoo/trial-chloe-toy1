import { useState, useEffect } from 'react';

export default useFetch = (methodName, ...args) =>{
    const [result, setResult] = useState(null);
    useEffect(()=>{
        let ignore = false;
        Meteor.callAsync(methodName, ...args).then((res,err)=>{
            if(!ignore) {
                setResult(res)
            }
        })
        return () => {
            ignore = true;
          };
    }, [methodName, ...args])

    return result;
}