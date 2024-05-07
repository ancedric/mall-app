import PropTypes from 'prop-types'

const InfoCard = ({infos}) => {

  const infoCardStyle = {
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