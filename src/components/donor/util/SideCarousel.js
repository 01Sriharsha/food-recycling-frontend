import React from 'react'
import { Carousel } from 'react-bootstrap'
import donate2 from '../../../assets/donate2.png'
import donate3 from '../../../assets/donate3.png'

export default function SideCarousel() {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <Carousel variant='light' className='w-100'>
                <Carousel.Item className=''>
                    <div className='d-flex justify-content-center'>
                        <img src={donate2} alt="donate2" width={'100%'} className="shadow rounded" />
                    </div>
                </Carousel.Item>
                <Carousel.Item className=''>
                    <div className='d-flex justify-content-center'>
                        <img src={donate3} alt="donate3" width={'100%'} className="shadow rounded" />
                    </div>
                </Carousel.Item>
            </Carousel>
            <div className='my-4'>
                <h4>" If you can't feed a hundred people, then feed just one"</h4>
                <h6 className='w-100 text-primary text-end fw-bolder'>- Mother Teresa</h6>
                <p>
                    Most cities in India have large landfills being filled up with edible food waste. Some cities food waste is actually 97% of the total solid waste. India wastes nearly 67 million and It amounts to Rs93,000 cr worth of food, which means it can feed the most populated state of Bihar for a complete year
                </p>
            </div>
        </div>
    )
}
