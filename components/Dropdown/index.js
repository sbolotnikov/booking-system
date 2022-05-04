import { Fragment, useState } from 'react';

function Dropdown(props) {
  return (
    
      <div
        className="dropdown m-auto before:border-2 before:border-main-bg before:border-solid"
        onClick={(e) => e.target.classList.toggle('active')}
      >
        <input
          type="text"
          className="textBox bg-main-bg"
          placeholder="Dropdown Menu"
          readOnly
        />
        <div className="option backdrop-blur-md">
          <div
            onClick={(e) => {
              document.querySelector('.textBox').value = 'HTML';
            }}
          >
            {' '}
            HTML
          </div>
          <div
            onClick={(e) => {
              document.querySelector('.textBox').value = 'CSS';
            }}
          >
            {' '}
            CSS
          </div>
          <div
            OnClick={(e) => {
                document.querySelector('.textBox').value = 'Javascript';
            }}
          >
            {' '}
            Javascript
          </div>
          <div
            onClick={(e) => {
                document.querySelector('.textBox').value = 'Bootstrap';
            }}
          >
            {' '}
            Bootstrap
          </div>
          <div
            onClick={(e) => {
                document.querySelector('.textBox').value = 'ReactJS';
            }}
          >
            {' '}
            ReactJS
          </div>
        </div>
      </div>
    
  );
}
export default Dropdown;
