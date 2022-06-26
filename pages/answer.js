import React from 'react'
import AccordionFAQ from '../components/accordionFAQ';
import { useContext } from 'react';
import AppContext from '../appContext';
function answer() {
    const value = useContext(AppContext);
    console.log(value.questions)
  return (
   <div className="flex justify-center items-center flex-col">
             <h1 className="pt-8 font-bold mb-3 mx-auto text-5xl text-center">
        {'Часто задаваемые вопросы'}
      </h1>
      <AccordionFAQ options={value.questions} />
   </div>   
   
  )
}

export default answer