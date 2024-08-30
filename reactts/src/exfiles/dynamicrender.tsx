import './dynamicrender.css'

function DynamicRender() {
    const List1 = []
    List1.push('SUV')
    const ListRender = List1.map((item) => (
        <li key={item.toString()}>{item}</li>
    ))

    return (
        <>
            <ul className="list-style">{ListRender}</ul>
        </>
    )
}

export default DynamicRender
