function TimeDisplay({_id,price,time,timeStatus}) {
    return (
        <div style={{borderColor: timeStatus}} className="m-1  overflow-hidden rounded-md">
        <h4 style={{backgroundColor: timeStatus}} className=" w-14 text-center">
           {time}
        </h4>
        {timeStatus=='green'&&<h4 className="bg-gray-800">{price}</h4>}
        </div>
    )
}

export default TimeDisplay
