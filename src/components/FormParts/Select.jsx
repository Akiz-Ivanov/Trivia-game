import { data } from "../../data/data"
import Option from "./Option"

export default function Select({ onChange, formData }) {

    const selectEl = Object.entries(data).map(([key, value]) => {

        const labelText =
            key === "amount" ? "Number of questions" :
            key === "category" ? "Choose a category" : "Pick a difficulty level" // Custom labels for each key

        return (
            <div key={key} className="select-wrapper">
                <label htmlFor={key}>{labelText}</label>
                <select id={key} name={key} onChange={onChange} value={formData[key]}>
                    <Option valueArray={value} category={key}/>
                </select>
            </div>
        )
    })
    return selectEl
}