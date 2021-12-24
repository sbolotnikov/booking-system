function TimeDisplay({_id,price,time,timeStatus}) {
    return (
        <div key={"time"+_id} style={{borderColor: timeStatus}} className="m-1  overflow-hidden rounded-md">
        <h4 key={"head"+_id} style={{backgroundColor: timeStatus}} className=" w-14 text-center">
           {time}
        </h4>
        {timeStatus=='green'&&<h4 className="bg-gray-800"key={"bottom"+_id}>{price}</h4>}
        </div>
    )
}

export default TimeDisplay
