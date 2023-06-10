import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { RiFilterOffFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { TOAST_PROP } from '../../App'

export default function FilterByStatus({ allData, array, setArray }) {

  const [status, setStatus] = useState('');

  const filterRequestFoodByStatus = (value) => {
    setStatus(value)
    array.length && setArray(allData)
    const newArr = array.filter(element => element.status === value)
    return newArr.length ? setArray(newArr) : toast.info(`There are no ${value} food requests`, TOAST_PROP)
  }

  return (
    <div className='d-flex justify-content-center align-items-center gap-3'>
      <RiFilterOffFill size={'1.6rem'} className="text-info" />
      <Button variant="primary"
        className='btn-sm'
        onClick={() => {
          setStatus("")
          setArray(allData)
        }}
      >
        All
      </Button>

      <Button variant="warning"
        className='btn-sm'
        disabled={status==="rejected" || status==="approved"}
        onClick={() => {
          setArray(allData)
          filterRequestFoodByStatus("pending")
        }}
      >
        Pending
      </Button>

      <Button variant="success"
        className='btn-sm'
        disabled={status==="pending" || status==="rejected"}
        onClick={() => {
          filterRequestFoodByStatus("approved")
        }}
      >
        Approved
      </Button>

      <Button variant="danger"
        className='btn-sm'
        disabled={status==="pending" || status==="approved"}
        onClick={() => {
          filterRequestFoodByStatus("rejected")
        }}
      >
        Rejected
      </Button>
    </div>
  )
}
