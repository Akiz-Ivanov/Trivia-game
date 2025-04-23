import data from "../../data/data"
import Option from "./Option"

export default function Select({ onChange }) {
    const selectEl = Object.entries(data).map(([key, value]) => {
        return (
            <div key={key} className="select-wrapper">
                <label htmlFor={key}>Select {key}</label>
                <select id={key} name={key} onChange={onChange}>
                    <Option valueArray={value} category={key} />
                </select>
            </div>
        )
    })

    return selectEl
}