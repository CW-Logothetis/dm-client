import React from "react"

export default function AssigneeTags(props) {
    return (
        // <section>
        //     <h1>Welcome back, {props.user}!</h1>
        // </section>
        <div>
            <label>Assignee</label>
             <input type="text" name="assignees" value={props.form}  />
        </div>
        
    )
}
// I added props from scrimba video. think i have it right here at value = above. And in FileUpload at l.91.
// Error for the onChange though. Moved it to l.91 but when i press Click Me it goes to blank screen.
