
function RatingShowcase() {
    return (
        <div>
           <label className="rating-label"><strong>Hearts using <code>step="0.5"</code></strong>
  <input
    className="rating"
    max={30}
    onInput={(e)=>{
        e.target.style.setProperty('--value',e.target.value)
        }}
    step={0.5}
    style={{'--fill': '#6d7782','--symbol':'var(--heart)','--stars':30, '--starsize': '1rem', '--value': 0.5 }}
    type="range"
    defaultValue={0} />
</label>
<label className="rating-label" dir="rtl"><strong>Set <code>dir</code> to <code>rtl</code></strong>
  <input
    className="rating"
    max={5}
    onInput={(e)=>{
        e.target.style.setProperty('--value',e.target.value)
        }}
    step={0.5}
    style={{'--value':2}}
    type="range"
    defaultValue={2} />
</label>

<label className="rating-label"><strong>No JS, using <code>box-shadow</code></strong>
  <input
    className="rating rating--nojs"
    max={5}
    step={1}
    type="range"
    defaultValue={3} />
</label>

<label className="rating-label" dir="rtl"><strong>No JS <code>rtl</code></strong>
  <input
    className="rating rating--nojs"
    max={5}
    step={1}
    type="range"
    defaultValue={2} />
</label>

<label className="rating-label"><strong>Average rating is 3.37 <code>readonly</code></strong>
  <input
    className="rating"
    max={5}
    readOnly
    step={0.01}
    style={{'--fill':'#777','--value':3.37}}
    type="range"
    defaultValue={3.37} />
</label>

        </div>
    )
}

export default RatingShowcase
