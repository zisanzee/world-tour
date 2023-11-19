import PropTypes from 'prop-types'
import { useState } from "react";


const Country = ({country, handleMarked, didVisit}) => {
  const {name, flags, population, capital} = country;
  const [wish, setWish]=useState(false)
  const wishFun = ()=>{
    setWish(!wish)
  }
  return (
    <div className="country-container" style={wish?{ border:"solid 3px skyBlue", boxShadow:" 0 8px 40px 0 rgba(255, 0, 0, 0.347), 0 12px 40px 0 rgba(0, 145, 255, 0.45)"}:{borderColor:'orange'}}>
      <img src={flags?.png} alt="" />
      <h3>Capital: <br /> <span style={{fontSize:'18px'}}>{capital}</span></h3>
      <div>
      <h2>{name?.common}</h2>
      <h5>population: {population.toLocaleString()}</h5>
      </div>
      <button className="wishButton" onClick={wishFun}>{wish? 'X':"❤"}</button>
      <button onClick={()=>{handleMarked(country)}} 
      style={{backgroundColor: didVisit? '': '#b10f0f', color: 'white',}} className="visitedButton">{didVisit? 'Marked': 'Mark Visited'}</button>
    </div>
  );
};

Country.propTypes = {
  country: PropTypes.object.isRequired,
  handleMarked: PropTypes.func.isRequired,
  didVisit: PropTypes.bool
}

export default Country;