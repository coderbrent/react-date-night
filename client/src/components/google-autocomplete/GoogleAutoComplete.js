import React, { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import qbStyles from '../questionnaire-box/QuestionBox.module.css'
// import Spinner from 'react-spinkit'

const GoogleAutoComplete = () => {
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })
  const [address, setAddress] = useState('')

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
  
    setAddress(value)
    setCoordinates(latLng)
    
    console.log(results);
  };
  
  // TODO: Look at the other options on Google
  const searchOptions = {
    types: ['address']
  }

  return (
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
  )
}

export default GoogleAutoComplete;