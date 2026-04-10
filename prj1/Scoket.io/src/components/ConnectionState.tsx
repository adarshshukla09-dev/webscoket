import React from 'react'

function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return (
    <div>{
      isConnected ? "connected" : "disconnected"
    }</div>
  )
}

export default ConnectionState