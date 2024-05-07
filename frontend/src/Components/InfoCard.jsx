import PropTypes from 'prop-types'

const InfoCard = ({infos}) => {

  const infoCardStyle = {
    "width" : "24rem",
    "box-shadow": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "margin" : "4rem",
    "margin-bottom" : "4rem",
    "margin-left" : "5rem",
    "margin-right" : "5rem",
    "border" : "2px solid",
    "border-image" : "linear-gradient(to bottom, #fff, #2c0f4d)",
    "border-image-slice" : "1",
    "padding" : "10px",
    "border-radius" : "13px",
  }

  const figure ={
    "padding-left" : "0",
    "display" : "flex",
  }
    
  return (
    <div className="card" style={infoCardStyle}>
    <figure style={figure}><img src={infos.image} alt="Shoes" width={300} height={280} /></figure>
        <div className="card-body">
            <h2 className="card-title">{infos.title}</h2>
            <p>{infos.desc}</p>
        </div>
    </div>
  )
}

InfoCard.propTypes = {
  infos: PropTypes.shape({
    image:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  }).isRequired,
}

export default InfoCard