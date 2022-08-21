
import React, { useEffect, useState } from "react";

function InputField (){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [text, setText] = useState("");


useEffect(()=>{
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res=>{
        console.log(res)
        return res.json()
    })
    .then(
        (result)=>{
            setIsLoaded(true);
            setText(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
    )
},[])


if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
        <p>{text.value}</p>
    );
  }
}

export default InputField;