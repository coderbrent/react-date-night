import React, { useEffect, useState } from 'react'
import qbStyles from '../questionnaire-box/QuestionBox.module.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Spinner from 'react-spinkit'

const QuestionBox = ({ userLocation }) => {
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })
  const [address, setAddress] = useState(``)

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value)
    setCoordinates(latLng)
    
    console.log(results);
  };
 
  // these are the search options for the places API
  const searchOptions = {
    types: ['address']
  }

  return (
    <>
    <div className={qbStyles.box}>
      <div className={qbStyles.header}>
        Where will you be going?
      </div> 
      <label>
        <PlacesAutocomplete 
          value={address} 
          onChange={setAddress} 
          onSelect={handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: "City, State, Zip" })} 
                type="text" className={qbStyles.destinationInput} 
              /> 
              <div>
                { suggestions.map(suggestion => {
                  const style = {
                    fontSize: 'smaller',
                    backgroundColor: suggestion.active ? "rgb(3, 210, 152)" : "rgba(0, 0, 0, 0.100)"
                  }

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}> 
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </div>
          )} 
        </PlacesAutocomplete>
      </label>
      <button 
        className={ address ? qbStyles.submitButton : qbStyles.disabledButton }>
        Next
      </button>
      <button onClick={ ()=> { console.log(userLocation) } }> hey</button>
    </div>
    </>
  )
}

export default QuestionBox;