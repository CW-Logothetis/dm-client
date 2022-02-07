import React from "react"

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

export default function AssigneeTags(props) {
    return (
       
        <div>
            <label>Assignee</label>
             <input type="text" name="assignees" value={props.form}  />
        </div>
        
    )
}

// I added props from scrimba video. think i have it right here at value = above. And in FileUpload at l.91.
// Error for the onChange though. Moved it to l.91 but when i press Click Me it goes to blank screen.
