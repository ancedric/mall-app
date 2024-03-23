import SignIn from "../Authentication/SignIn";

const Header = () => {
    const headerStyle = {
        "display": "flex",
        "background-color":"#fff",
        "justify-content":"space-around",
        "align-items":"center",
        "margin":"0",
        "color":"#1a56a1",
        "box-shadow":"0 0 10px rgba(0, 0, 0, 0.5)",
        "font-family":"sans-serif"
    }

  return (
    <div style={headerStyle} >
      <div>
        <h2>S-MALL</h2>
      </div>
      <div> 
        <SignIn></SignIn>
      </div>
    </div>
  );
}

export default Header