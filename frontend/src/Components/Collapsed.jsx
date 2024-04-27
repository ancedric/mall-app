export const Collapsed =  (data) => {
  return(
    <div className="pop-up">
          <h3>{data.title}</h3>
          <div className="profile-container">
            <div className="commands">
              <div className="buttons">
                <button className="green-btn" onClick={data.functions.addFunction}>
                  Add product
                </button>
                <button className="red-btn" onClick={data.functions.updateFunction}>
                  Remove product
                </button>
                <button className="blue-btn" onClick={data.functions.removeFunction}>
                  Update product
                </button>
              </div>
              {data.elements.map((elem) => (
                <div className="command" key={elem.id}>
                  <div><img
                    src={elem.image}
                    alt={elem.productName}
                    style={{ width: "200px", height: "200px" }}
                  /></div>
                  <div>
                  <h4>{elem.productName}</h4>
                  <h5>Category: {elem.category}</h5>
                  <p>{elem.description}</p>
                  <p>{elem.price} $</p>
                  <p>{elem.stock} items</p>
                  <p>{elem.nbLikes} Likes</p>
                  <p>{elem.nbSales} Commands</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}