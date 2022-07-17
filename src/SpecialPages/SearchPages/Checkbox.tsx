export const CheckboxInput = (props:any) => {
    return (
        <input
        type="checkbox"
        onChange={() => props.change(props.name)}
        >
        </input>
    )
} 

export default CheckboxInput