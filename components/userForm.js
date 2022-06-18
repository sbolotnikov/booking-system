function UserForm(props) {
    console.log(props.user.status)
    const changeStatus=async(e)=>{
        e.preventDefault();
        console.log(e.target.value, props.user._id)
        const res = await fetch('/api/supervise/update_user_status', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              selectedId: props.user._id,
              status: e.target.value
            }),
          });
          console.log(res);
          window.location.reload(false);
    }
    const handleDelete = (e) => {
        props.delUser({id:props.user._id,name:props.user.name});
      };
    return (
        <div className="w-full relative flex flex-row justify-between flex-wrap mb-6 mx-2">
          <img className="w-8" src={props.user.image}alt="user image"/>
          <h3 className="mx-1">{props.user.name}</h3>
          <h3>{"<"}{props.user.email}{">"}</h3>
          <select className="bg-main-bg mx-2" value={props.user.status} onChange={changeStatus}>
              <option value="undefined">Не определен</option>
              <option value="user">Пользователь</option>
              <option value="admin">Администратор</option>
              <option value="super">Супервайзер</option>
              
          </select>
          <button
        className=' p-2 h-4 bg-[#0C1118] rounded-full  flex justify-center  items-center'
        onClick={handleDelete}
      >
       <img className="h-4" src={'/icons/close.svg'} alt="menu close" />
      </button>
        </div>
    )
}

export default UserForm
