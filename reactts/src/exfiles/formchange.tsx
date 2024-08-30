import React from "react";
import './dynamicrender.css';

function FormChange() {

    const [InputValue, SetInputValue] = React.useState('')
    const HandleEvent = (event: React.ChangeEvent<HTMLInputElement>) => { SetInputValue(event.target.value) }

    const [List, setList] = React.useState<string[]>([])
    const ButtonHandle = () => {
        setList((PerElement) => [...PerElement, InputValue])
        SetInputValue("")
    }
    const ListRender = List.map((item) => (<li key={item.toString()}>{item}</li>))
    return (
        <>

            <input type="text" placeholder="change here" value={InputValue} onChange={HandleEvent} />
            <button onClick={() => ButtonHandle()}>Add this</button>
            <ul className="list-style">{ListRender}</ul>
        </>
    )
}

export default FormChange;