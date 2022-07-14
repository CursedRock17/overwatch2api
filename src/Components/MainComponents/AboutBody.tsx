import React from 'react'

class AboutBody extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="MainBody">
                <h1> About </h1>

                <p className='InfoPara'>
                    This is a completely open-source API which allows developers to make requests 
                    and grab information about Overwatch 2. Currently the main focus is all about the 
                    heroes and their abilies, damage, etc.
                </p>


            <style>{` 
            .InfoPara {
                width: 80%
                padding: 5%;
                margin: 5%;
                padding-bottom: 5%
            }
            `}
            </style>
            </div>
        )
    }
}

export default AboutBody