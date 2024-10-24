/* eslint-disable react/prop-types */


export const Card =({ui,curPost})=>{

    return(
        <>
          <li key={ui}>
            <div>
                <div>
                    <h1>{curPost.id}</h1>
                    <h3>Hello</h3>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
          </li>
        </>
    )
}