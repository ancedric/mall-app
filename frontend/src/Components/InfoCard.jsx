import PropTypes from 'prop-types'

const InfoCard = ({infos}) => {

  const infoCardStyle = {
    width : "24rem",
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    margin : "4rem",
    marginBottom : "4rem",
    marginLeft : "5rem",
    marginRight : "5rem",
    border : "2px solid",
    borderImage : "linear-gradient(to bottom, #fff, #2c0f4d)",
    borderImageSlice : "1",
    padding : "10px",
    borderRadius : "13px",
  }

  const figure ={
    paddingLeft : "0",
    display : "flex",
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