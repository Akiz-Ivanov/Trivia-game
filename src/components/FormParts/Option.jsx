export default function Option({ valueArray, category }) {

    const optionsToRender = category === "amount"
        ? valueArray
        : [{ name: `Any ${category}`, value: "" }, ...valueArray]

    const optionEl = optionsToRender.map(({ name, value }) => {
        return (
            <option key={value ?? name} value={value}>
                {name ? name : value}
            </option>
        )
    }
    )

    return optionEl
}