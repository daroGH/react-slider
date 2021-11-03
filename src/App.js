import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // create the last index to prev empty output to use
    const lastIndex = people.length - 1;
    // check if the index is negative, the index will go to the end of array
    if (index < 0) {
      setIndex(lastIndex);
    }
    //when index reach the end of array it will set back to 0
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // function to automate the slding by 3 second its like userfeed 
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span></span>
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          {
            /* we have to set variable exactly the same as the CSS className 
          (nextSlide,activeSlide) to evoke the function */
          }
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          {
            /* index - 1 check the LHS of the array  */
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
