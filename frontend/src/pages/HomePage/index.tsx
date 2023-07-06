import React from 'react'
import { useGetHelloQuery } from '../../api'

function HomePage() {
  const { data, error, isLoading } = useGetHelloQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) {
    
  }
  console.log(data)

  return (
    <div className="App">
      <header className="App-header">
        <p>{data?.message}</p>
      </header>
    </div>
  )
}

export default HomePage