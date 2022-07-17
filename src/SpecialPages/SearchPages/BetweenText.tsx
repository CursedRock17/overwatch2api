import styles from './SearchPagesStyles/styles.module.css'
import React from 'react'

export const TextInput = (props:any) => {
    return (
        <input
        type={props.type}
        placeholder={props.name}
        onChange={(e) => props.change(e.target.value)}
        >
        </input>
    )
} 

export default TextInput