import BirthdaySign from '../components/BirthdaySign';
import { useState } from 'react';
function birthday() {
  const [visible, setVisible] = useState(0);
  var colors = [
    {
      backgroundColor: '#ACD6B1',
      creamColor: '#FFEC00',
      highlightsColor: '#00A353',
      signColor: '#074F18',
    },
    {
      backgroundColor: '#BCD800',
      creamColor: '#00361D',
      highlightsColor: '#FBE116',
      signColor: '#074F18',
    },
    {
      backgroundColor: '#B0ECE1',
      creamColor: '#3F7C86',
      highlightsColor: '#FBE116',
      signColor: '#295E65',
    },
    {
      backgroundColor: '#FFBABE',
      creamColor: '#FBE116',
      highlightsColor: '#EA456A',
      signColor: '#E41346',
    },
    {
      backgroundColor: '#AD498C',
      creamColor: '#FFBABE',
      highlightsColor: '#FFBABE',
      signColor: '#FAE016',
    },
    {
      backgroundColor: 'url(#paint7_linear_275_626)', //"backgroundColor":"#DD2B1C", TO WHITE url(#paint7_linear_275_626)
      creamColor: '#FBE116',
      highlightsColor: '#DA7D3C',
      signColor: '#532D1A',
    },
    {
      backgroundColor: '#F27E00',
      creamColor: '#FBE116',
      highlightsColor: '#3D1E14',
      signColor: '#3D1E13',
    },

    {
      backgroundColor: '#FFBABE',
      creamColor: '#FBE116',
      highlightsColor: '#EA456A',
      signColor: '#E41346',
    },
    {
      backgroundColor: '#BCD800',
      creamColor: '#00361D',
      highlightsColor: '#FBE116',
      signColor: '#074F18',
    },
  ];
  var packages = [
    {
      name: 'Шестое чувство №1',
      header: 'для компании до 6 человек',
      line1: 'прятки на выбор 60 мин',
      line2: 'интерактивная комната 30 мин',
      line3: 'банкетная комната <<Восток>> 150 мин',
      price1: 'будни 6500',
      price2: 'выходные 7000',
    },
    {
      name: 'Шестое чувство №2',
      header: 'для компании до 6 человек',
      line1: 'квест 60 мин',
      line2: 'интерактивная комната 30 мин',
      line3: 'банкетная комната <<Восток>> 150 мин',
      price1: 'будни 6500',
      price2: 'выходные 7000',
    },
    {
      name: 'Шестое чувство №3',
      header: 'для компании до 6 человек',
      line1: 'прятки во тьме 60 мин',
      line2: 'прятки <<Среди нас>> 60 мин',
      line3: 'банкетная комната <<Восток>> 180 мин',
      price1: 'будни 8000',
      price2: 'выходные 9000',
    },
    {
      name: 'Шестое чувство №4',
      header: 'для компании до 6 человек',
      line1: 'прятки на выбор 60 мин',
      line2: 'квест 60 мин',
      line3: 'банкетная комната <<Восток>> 180 мин',
      price1: 'будни 8000',
      price2: 'выходные 9000',
    },

    {
      name: 'В десятку! №1',
      header: 'для компании до 10 человек',
      line1: 'прятки на выбор 60 мин',
      line2: 'интерактивная комната 30 мин',
      line3: 'банкетная комната <<Loft>> 150 мин',
      price1: 'будни 10000',
      price2: 'выходные 10500',
    },
    {
      name: 'В десятку! №2',
      header: 'для компании до 10 человек',
      line1: 'прятки во тьме 60 мин',
      line2: 'прятки <<Среди нас>> 60 мин',
      line3: 'банкетная комната <<Loft>> 180 мин',
      price1: 'будни 12000',
      price2: 'выходные 13500',
    },
    {
      name: 'В десятку! №3',
      header: 'для компании до 10 человек',
      line1: 'квест 60 мин',
      line2: 'квест 60 мин',
      line3: 'банкетная комната <<Loft>> 180 мин',
      price1: 'будни 13000',
      price2: 'выходные 14500',
    },
    {
      name: 'Своя компания №1',
      header: 'для компании до 15 человек',
      line1: 'прятки на выбор 60 мин',
      line2: 'интерактивная комната 30 мин',
      line3: 'банкетная комната <<Loft>> 150 мин',
      price1: 'будни 14000',
      price2: 'выходные 15000',
    },
    {
      name: 'Своя компания №2',
      header: 'для компании до 15 человек',
      line1: 'прятки во тьме 60 мин',
      line2: 'прятки <<Среди нас>> 60 мин',
      line3: 'банкетная комната <<Loft>> 180 мин',
      price1: 'будни 16500',
      price2: 'выходные 19000',
    },
  ];
  return (
    <div className="w-full h-[95%] flex justify-center items-center bg-black">
      <div className="max-w-[1170px] w-full  flex flex-col m-auto">
        <label className="my-3">
          {'Выбрерите пакет : '}
          <select
            style={{ background: 'black', color: 'white' }}
            className="font-bold rounded"
            onChange={(e) => {
              e.preventDefault();
              setVisible(e.target.value);
            }}
          >
            {packages.map((item, index) => {
              return (
                <option
                  key={'pckg' + index}
                  value={index}
                  style={{ background: 'black', color: 'white' }}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </label>
        <BirthdaySign colors={colors[visible]} lines={packages[visible]} />
      </div>
    </div>
  );
}

export default birthday;
