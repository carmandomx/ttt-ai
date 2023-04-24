import PropTypes from 'prop-types'
import './Settings.css'

const Settings = ({ clearBoard, done, updateUserChar, userChar }) => {
  // Choise: 'x' or 'o'
  const onChangeValue = (event) => {
    updateUserChar(event.target.value)
    clearBoard()
  }

  return (
    <div className='settings'>
      <div className='userSetting' onChange={onChangeValue}>
        <div className='radioButton'>
          <input type='radio' value='x' name='userChar' />
          <span style={{ marginTop: '3px' }}>{'\u2716'}</span>
        </div>
        <div className='radioButton'>
          <input type='radio' value='o' name='userChar' defaultChecked={userChar === 'o'} />
          <span style={{ marginTop: '8px' }}>{'\u2B58'}</span>
        </div>
        <div className='radioButton'>
          <input type='radio' value='Normal' name='Normal' defaultChecked={userChar === 'Normal'}/>
          <span style={{ marginTop: '3px' }}>Normal</span>
        </div>
        <div className='radioButton'>
          <input type='radio' value='MinMax' name='MinMax'/>
          <span style={{ marginTop: '8px' }}>MinMax</span>
        </div>
      </div>
      <div className='clearBoard'>
        <button onClick={clearBoard}>
          {done ? 'Play again?' : 'RESTART GAME'}
        </button>
      </div>
    </div>
  )
}

Settings.propTypes = {
  clearBoard: PropTypes.func,
  done: PropTypes.string,
  updateUserChar: PropTypes.func,
  userChar: PropTypes.string
}

export default Settings
