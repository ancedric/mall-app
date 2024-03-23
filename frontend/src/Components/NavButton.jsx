import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Navbutton({buttonData}) {
    //style...
    const linkStyle = {
        "width":"150px",
        "height":"50px",
        "margin":"10px",
        "background-color":buttonData.color,
        "border-radius":"8px",
        "border":buttonData.border,
        "transition":"background-color 0.3s ease-in-out",
      }

    //functions...
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(buttonData.path)
    }
  return (
    <button onClick={() => handleRedirect()} style={linkStyle}>{buttonData.text}</button>
  )
}

Navbutton.propTypes = {
  buttonData: PropTypes.shape({
    color: PropTypes.string.isRequired ,
    border: PropTypes.string.isRequired , 
    path: PropTypes.string.isRequired ,
    text: PropTypes.string.isRequired ,  })
}
export default Navbutton