import { useState, useEffect } from 'react';
import AlertMenu from '../components/alertMenu';
// import Link from 'next/link';
import UserForm from '../components/userForm';

function user_screen() {
  const [users, setUsers] = useState([]);
  const [usersType, setUsersType] = useState("Все");
  const [usersDisplay, setUsersDisplay] = useState([]);
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const [selectedId, setSelectedId] = useState('');
  const [style1, setStyle1] = useState({ display: 'none' });
  var filtersArray = [["Все",""],["Пользователи","user"], ["Админы","admin"],["Супервайзеры","super"]]
  const filterSet=(e)=>{
      e.preventDefault();
      setUsersType(e.target.innerHTML)
      if (e.target.dataset.id=="user") setUsersDisplay(users.filter(user=>(user.status!=="admin")&&user.status!=="super")) 
      else if (e.target.dataset.id=="") setUsersDisplay(users)
      else setUsersDisplay(users.filter(user=>user.status==e.target.dataset.id)) 
  }
  useEffect(async () => {
    // GET request
    const res = await fetch('/api/supervise/get_users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let data = await res.json();
    console.log(data)
    setUsers(data);
    setUsersDisplay(data)
  }, []);
  const handleDelete=(e)=>{
      console.log(e)
      setSelectedId(e.id);
      setAlertStyle({
        variantHead: 'danger',
        heading: 'Предупреждение',
        text: `Вы точно хотите удалить запись о ${e.name}?`,
        color1: 'danger',
        button1: 'Подтвердить',
        color2: 'secondary',
        button2: 'Отмена',
      });
      setRevealAlert(true);
  }
  const onReturn = async (decision1) => {
    setRevealAlert(false);
    if (decision1 == 'Подтвердить') {
      const res = await fetch('/api/supervise/del_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id:selectedId,
        }),
      });
      window.location.reload(false);
    }
}
  return (
    <div className="w-full flex justify-center items-center">
        {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      <div className="w-full max-w-[1000px] flex flex-row justify-center items-center flex-wrap">
        <h3 className="w-full xs:text-md sm:text-xl phone:text-2xl tablet:text-3xl text-center">
          Информация о пользователях
          </h3>
          <h5 className="w-full xs:text-md sm:text-lg phone:text-xl tablet:text-2xl text-center"> фильтр:
          <div
            className="relative cursor-pointer"
            onMouseEnter={(e) => {
              setStyle1({ display: 'block' });
            }}
            onMouseLeave={(e) => {
              setStyle1({ display: 'none' });
            }}          
          >
            {usersType}
            <div
              style={style1}
              className="absolute top-8 right-0 z-[1000] w-full flex flex-col justify-center items-center flex-wrap "
            >
              <div className="w-auto rounded-md border bg-[#0C1118]  p-0.5 m-1">
                { filtersArray.map((item, index) => {
                  return (
                    
                      <h3 key={`usertype__${index}`} data-id={item[1]} onClick={filterSet}>
                      {item[0]}
                    </h3> 
                    
                  );
                })}
              </div>
            </div>
          </div>
        </h5>
        {usersDisplay &&
            usersDisplay.map((item, index) => {
              return (
                <UserForm
                  key={'userN' + index}
                  user={item}
                  delUser={handleDelete}
                />
              )
            })}

      </div>
    </div>
  );
}
                  
export default user_screen;