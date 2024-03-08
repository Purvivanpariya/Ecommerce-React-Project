import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useAuth } from '../../Context/Auth'
import axios from 'axios'

const Cart = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setcart] = useState([])
  
    const getCart = async() => {
      try {
        let {data} = await axios.get(`http://localhost:5000/carts?user=${auth.user?.id}`)
        console.log(data);
        setcart(data)
       
      } catch (err) {
        console.log(err);
        return false
      }
    }

    const DeleteData = async(id) => {
      try {
        let {data} = await axios.delete(`http://localhost:5000/carts/${id}`)
        let del = cart.filter((val)=>{
          return val.id !== id
        })
        setcart(del)
      } catch (error) {
        console.log(error);
        return false
      }
    }
  
    
  
    useEffect(() => {
      getCart()
    },[auth.user?.id])
  
  return (
    <div>
      <Header/>
      <div className="container">
        <div className="row justify-content-center">
          <h2 className='text-center'>Cart</h2>

          <div className="col-md-10">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Img</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                   cart && cart.map((val , i) => {
                    i++
                    return (
                      <tr>
                        <th scope="row">{i}</th>
                        <td>{val.product}</td>
                        <td>
                          <img src={val.image} width="50" />
                        </td>
                        <td>${val.price}</td>                       
                        <td>
                          <button className='btn btn-danger' onClick={() => DeleteData(val.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
