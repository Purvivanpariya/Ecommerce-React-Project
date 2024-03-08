import React from 'react'
import { Link } from 'react-router-dom'
import './Leftsidebar.css'

const Leftsidebar = () => {
  return (
    <>
      <div class="container pt-0">
        <div class="sidebar mt-0" id="sidebar">
            <div id="head">
                <p class="logo mb-2">Pages</p>
            </div>
            <ul class="list text-center mt-5">
                <Link className='mt-5  ' to={'/admin/dashboard'}><p>Dashboard</p></Link>
                {/* <Link className='mt-5  ' to={'/admin/userdetails'}><p>User Details</p></Link> */}
                <Link className='mt-5 ' to={'/admin/category'}><p>Category</p></Link>
                <Link className='mt-5 ' to={'/admin/product'}><p>Product</p></Link>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Leftsidebar
