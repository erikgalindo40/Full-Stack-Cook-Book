function Direction({ text, keyid, onChangeDirectionInfo, onDeleteRecipeDirection }) {

    return (
    <li key={keyid}>
        <label htmlFor="recipe-direction"></label>
        <textarea name='text' value={text} keyid={keyid} onChange={(e)=>onChangeDirectionInfo(e,keyid)} className='recipe-form-textarea direction-textarea' id='recipe-direction'/>
        <button onClick={(e)=>onDeleteRecipeDirection(e, keyid)}>x</button>
    </li>
    )
}

export default Direction