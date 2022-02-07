import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const StandardDropzone = () => {
  
  
    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta)
    }
  
  
  
    return (
      <form>

          <Dropzone
          
            onChangeStatus={handleChangeStatus}
           
            styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
          />

      </form>  
    )
  }
  
export default StandardDropzone