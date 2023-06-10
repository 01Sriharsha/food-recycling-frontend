import React from 'react'
import { Accordion } from 'react-bootstrap'
import { BsArrowReturnRight } from 'react-icons/bs'

export default function Faq() {

    const faqArr = [
        {
            question: 'What is the Food Recycling Project?',
            answer: 'The Food Recycling Project is a project aimed at reducing food waste by collecting excess food from individuals and businesses and redistributing it to those in need.'
        },
        {
            question: 'Who can participate in the Food Recycling Project?',
            answer: "Anyone can participate in the Food Recycling Project, whether it's by donating excess food or volunteering to help with the collection and redistribution process."
        },
        {
            question: "How can I donate food to the Food Recycling Project?",
            answer: "You can donate food by contacting the project organizers through their website or social media pages. They will provide you with information on how and where to donate."
        },
        {
            question: "How can I volunteer for the Food Recycling Project?",
            answer: "You can volunteer for the Food Recycling Project by contacting the project organizers through their website or social media pages. They will provide you with information on how to get involved and the tasks that need to be done."
        },
        {
            question: "What happens to the food that is collected by the Food Recycling Project?",
            answer: "The collected food is sorted and distributed to local organizations that serve those in need, such as food banks and homeless shelters."
        },
        {
            question: "How does the Food Recycling Project help the environment?",
            answer: "By reducing the amount of food waste that goes to landfills, the Food Recycling Project helps reduce greenhouse gas emissions and helps conserve natural resources."
        },
        {
            question: "How can I support the Food Recycling Project?",
            answer: "You can support the Food Recycling Project by spreading the word about their mission, donating food or money, or volunteering your time and skills. You can also follow them on social media and share their posts with your network."
        },
    ]

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {
                    faqArr.map((faq, index) => (
                        <Accordion.Item key={index} eventKey={index} className=" my-2 shadow">
                            <Accordion.Header>Q : {faq.question}</Accordion.Header>
                            <Accordion.Body className='d-flex align-items-center gap-2'>
                                <BsArrowReturnRight size={'1.2rem'} />
                                <span>{faq.answer}</span>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    )
}
