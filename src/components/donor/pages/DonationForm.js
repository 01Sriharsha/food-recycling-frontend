import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { getAllAreasByCity, getAllCities, getAllFoodType, getSingleCity } from '../../../api/adminService'
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext'
import { addNewDonation, uploadFoodImage } from '../../../api/DonorService';
import SideCarousel from '../util/SideCarousel';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

export default function DonationForm() {

  const context = CustomContext();

  const navigate = useNavigate();

  const donorTypes = ["Home", "Hotel", "Marraige Hall", "Street Food", "Other"]

  // const foodTypes = ["Vegetables", "Fruits", "Meat", "Meal", "Bread", "Diary", "Other"]

  const [inputVal, setInputVal] = useState({
    donorType: '', name: '', foodType: '', foodItems: '', quantity: '', city: '', area: '', address: '', expiration: ''
  })

  const [image, setImage] = useState(null);

  const [cityName, setCityName] = useState('');

  const [cities, setCities] = useState([]);

  const [areas, setAreas] = useState([]);

  const [foodTypes, setFoodTypes] = useState([])

  const [foodItemsList, setFoodItemsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
    getAllCities().then(res => setCities(res.data)).catch(err => console.log(err));

    getAllFoodType().then(res => setFoodTypes(res.data)).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if (inputVal.city) {
      getAllAreasByCity(parseInt(inputVal.city)).then(res => setAreas(res.data)).catch(err => console.log(err))

      //Fetch city name using city id
      getSingleCity(parseInt(inputVal.city)).then(res => setCityName(res.data.name)).catch(err => console.log(err));
    }
  }, [inputVal.city])

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0])
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputVal.donorType?.length === 0 || inputVal.name?.length === 0
      || inputVal.type?.length === 0 || inputVal.city?.length === 0
      || inputVal.area?.length === 0 || inputVal.address?.length === 0
      || inputVal.expiration?.length === 0) {
      toast.error("Fields cannot be empty!!", TOAST_PROP)
      return;
    }

    if (foodItemsList.length === 0) {
      toast.error("Add items to donate!!", TOAST_PROP)
      return;
    }

    const donorId = context?.user?.id

    const donationData = {
      donorType: inputVal.donorType,
      donorName: inputVal.name,
      foodType: inputVal.foodType,
      foodItems: JSON.stringify(foodItemsList),
      city: cityName,
      area: inputVal.area,
      address: inputVal.address,
      expirationDate: inputVal.expiration,
      status: "pending"
    }
    toast.promise(addNewDonation(donorId, donationData), {
      pending: "Adding...",
      success: "Donation added successfully!!"
    }, TOAST_PROP)
      .then(res => {
        uploadFoodImage(res.data.id, image).then(res => console.log(res)).catch(err => console.log(err))
        handleReset();
        alert("Your Donation id is : " + res.data.id)
        setTimeout(() => {
          navigate("/donor/charity")
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to add donation!!", TOAST_PROP)
      })
  }

  function handleReset() {
    setInputVal({
      donorType: '', name: '', foodType: '', foodItems: '', quantity: '', city: '', area: '', address: '', expiration: ''
    })
  }

  return (
    <Container className=''>
      <Row className='py-3'>
        <Col xs={12} md={7}>
          <div className='d-flex justify-content-center align-items-center w-100 mt-3'>
            <Form className='px-4 shadow rounded w-75'
              onSubmit={(e) => {
                if (!context?.isAuthenticated) {
                  toast.info("Please Login to Continue...", TOAST_PROP)
                  navigate("/login")
                } else handleSubmit(e)
              }}>
              <h1 className='text-center my-3 text-primary fw-semibold text-uppercase'>Donate Food</h1>
              {/* Donating From */}
              <Form.Group className="my-2">
                <Form.Label htmlFor='donorType'>Donating From</Form.Label>
                <Form.Select name="donorType" id="donorType"
                  onChange={handleChange}
                  value={inputVal.donorType}
                  className="text-capitalize text-center">
                  <option hidden>{"--select donor type--"}</option>
                  {donorTypes.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* Donor or organization name */}
              {
                inputVal.donorType &&
                <Form.Group className="my-2">
                  <Form.Label htmlFor='name'>
                    {(inputVal.donorType === "Home") ? 'Donor Name' : 'Organization Name'}
                  </Form.Label>
                  <Form.Control type="text" name="name" id="name" className='text-capitalize'
                    placeholder={(inputVal.donorType === "Home") ? 'Enter your name' : 'Enter organization name'}
                    value={inputVal.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              }

              <Form.Group className="my-2">
                <Form.Label htmlFor='foodType'>Food Type</Form.Label>
                <Form.Select name="foodType" id="foodType" value={inputVal.foodType} onChange={handleChange} className="text-capitalize text-center">
                  <option hidden>{"--select food type--"}</option>
                  {foodTypes.map(element => (
                    <option key={element.id} value={element.foodType}>{element.foodType}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {
                inputVal.foodType &&
                <Form.Group>
                  <Form.Label htmlFor='foodItems'>Food Items</Form.Label>
                  <div className='d-flex justify-content-between align-items-center gap-3'>

                    <Form.Control type="text" name="foodItems" id="foodItems"
                      className="text-capitalize" placeholder="specify each food items"
                      value={inputVal.foodItems} onChange={handleChange} />

                    <div className='d-flex justify-content-center align-items-center gap-3'>
                      <Form.Control type="number" name="quantity" id="quantity"
                        className="text-capitalize" placeholder="quantity in KG"
                        value={inputVal.quantity} onChange={handleChange} />

                      <Button className='btn-sm'
                        onClick={() => {
                          inputVal.foodItems &&
                            setFoodItemsList([...foodItemsList, {
                              item: inputVal.foodItems, quantity: inputVal.quantity + " Kg"
                            }])
                          setInputVal({ ...inputVal, foodItems: '', quantity: '' })
                        }}>
                        Add
                      </Button>
                    </div>
                  </div>
                  {
                    foodItemsList.map((element, index) => (
                      <Row xs={3} key={index} className="d-flex justify-content-between my-2 text-capitalize">
                        <Col className='d-flex justify-content-center'>
                          Item : {element.item}
                        </Col>

                        <Col className='d-flex justify-content-center'>
                          quantity : {element.quantity}
                        </Col>

                        <Col className='d-flex justify-content-center align-items-center'>
                          <AiFillDelete role="button"
                            color='red'
                            onClick={() => {
                              const newArr = foodItemsList.filter(item => item.item !== element.item)
                              setFoodItemsList(newArr)
                            }}
                          />
                        </Col>
                      </Row>
                    ))
                  }
                </Form.Group>
              }

              <Form.Group className="my-2">
                <Form.Label htmlFor='expiration'>Expiration Date</Form.Label>
                <Form.Control type="date" name="expiration" id="expiration" className="text-capitalize"
                  onChange={handleChange} value={inputVal.expiration}
                />
              </Form.Group>

              <Form.Group className="my-2">
                <Form.Label htmlFor='image'>Upload Food Image</Form.Label>
                <Form.Control type="file" name="image" id="image" className="text-capitalize"
                  onChange={handleImageChange}
                />
              </Form.Group>

              <Form.Group className="my-2">
                <Form.Label htmlFor='city'>City</Form.Label>
                <Form.Select name="city" id="city" value={inputVal.city} onChange={handleChange} className="text-capitalize text-center">
                  <option hidden>{"--select City--"}</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {(inputVal.city && areas.length !== 0) &&
                <Form.Group className="my-2">
                  <Form.Label htmlFor='city'>Area</Form.Label>
                  <Form.Select name="area" id="area" value={inputVal.area} onChange={handleChange} className="text-capitalize text-center">
                    <option hidden>{"--select Area--"}</option>
                    {areas.map(area => (
                      <option key={area.id} value={area.name}>{area.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              }
              {
                (inputVal.area && areas.length !== 0) &&
                <Form.Group className="my-2">
                  <Form.Label htmlFor='address'>Pick Up Address</Form.Label>
                  <Form.Control as='textarea' type="text" name="address" id="address" value={inputVal.address} onChange={handleChange} rows="1" />
                </Form.Group>
              }
              <div className='w-100 d-flex justify-content-center gap-3 my-4'>
                <Button variant='secondary' className='w-25' onClick={handleReset}>Reset</Button>
                <Button variant='primary' className='w-25' type="submit">Donate</Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col className='my-3' xs={12} md={5}>
          <SideCarousel />
        </Col>
      </Row>
    </Container>
  )
}
