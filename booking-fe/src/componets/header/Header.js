import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faPlane, faTaxi, faCalendarDays,faUser } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';




function Header({type}) {

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }).format(date);

    return formattedDate.replace(',', ''); // Loại bỏ dấu phẩy
}

  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1

  });

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      }
    })
  }

  const checkAdults = options.adult > 1 ? 'adults' : 'adult';
  const checkRooms = options.room > 1 ? 'rooms' : 'room';

  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div className='header'>
      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className='headerList'>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>

        </div>

        {type !== "list" &&
          <>
            <h1 className='headerTitle'>Find your next stay</h1>
            <p className='headerDesc'>
              Search low prices on hotels, homes and much more...
            </p>
            <div className='headerSearch'>
              <div className='headerSearchItem iconBed'>
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input type='text' placeholder='Where are you going?' className='headerSearchInput' />
              </div>

              <div className='headerSearchItem iconCalendar'>
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${formatDate(date[0].startDate)} - ${formatDate(date[0].endDate)}`}</span>
                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className='date'
                />}
              </div>

              <div className='headerSearchItem iconUser'>
                <FontAwesomeIcon icon={faUser} className='headerIcon' />
                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} ${checkAdults} · ${options.children} children · ${options.room} ${checkRooms}`}</span>
                {openOptions && <div className='options'>
                  <div className='optionItem'>
                    <span className='optionText'>
                      Adult
                    </span>
                    <div className='optionCounter'>
                      <button
                        disabled={options.adult <= 1}
                        className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</button>
                      <span className='optionCounterNumber'>{options.adult}</span>
                      <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                    </div>
                  </div>

                  <div className='optionItem'>
                    <span className='optionText'>
                      Children
                    </span>
                    <div className='optionCounter'>
                      <button
                        disabled={options.children <= 0}
                        onClick={() => handleOption("children", "d")} className='optionCounterButton'>-</button>
                      <span className='optionCounterNumber'>{options.children}</span>
                      <button onClick={() => handleOption("children", "i")} className='optionCounterButton'>+</button>
                    </div>
                  </div>

                  <div className='optionItem'>
                    <span className='optionText'>
                      Room
                    </span>
                    <div className='optionCounter'>
                      <button
                        disabled={options.room <= 1}
                        className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</button>
                      <span className='optionCounterNumber'>{options.room}</span>
                      <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                    </div>
                  </div>
                </div>}
              </div>
              <div className='headerSearchItem btn'>
                <button className='headerBtn'>
                  Search
                </button>
              </div>
            </div>
          </>}
      </div>
    </div>
  );
}

export default Header;