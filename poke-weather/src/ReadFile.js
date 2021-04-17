import React from 'react'

function ReadFile() {
  var common_coords = {}
  fetch("localhost:3000/coords.json")
  .then(res => res.json())
  .then(
    (result) => {
      common_coords = result;
    }
  )
  return (
    common_coords
  )
}

export default ReadFile
