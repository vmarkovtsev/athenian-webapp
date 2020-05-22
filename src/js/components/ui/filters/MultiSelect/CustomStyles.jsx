import SearchIcon from './SearchIcon.svg'

/**
 * Overrides react-select components styles
 */
const placeholder = {
  alignItems: 'center',
  display: 'flex',
  color: '#C3C4D0',
  ':before': {
    background: `url(${SearchIcon}) no-repeat`,
    backgroundSize: '100%',
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 12,
    width: 12,
  }
}

export const customStyles = {
  container: styles => ({
    ...styles,
    position: 'absolute',
    background: '#e7e7ec',
    border: '1px solid #E7E7EC',
    top: 'calc(100% + 8px)'
  }),
  valueContainer: styles => ({
    ...styles,
    marginTop: -7,
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: 'transparent',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    visibility: 'hidden'
  }),
  option: styles => ({
    ...styles,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#121343',
    minHeight: 36,
  }),
  control: styles => ({
    ...styles,
    borderRadius: 0,
    borderColor: '#E7E7EC',
    paddingRight: '8px',
    margin: '10px 10px 1px',
    minHeight: 30,
    height: 30
  }),
  menu: styles => ({
    ...styles,
    marginTop: 0,
    borderRadius: 0,
    boxSizing: 'content-box',
    left: '-1px',
  }),
  menuList: styles => ({
    ...styles,
    padding: 0
  }),
  input: styles => ({
    ...styles,
    color: '#333',
    ...placeholder
  }),
  placeholder: styles => ({
    ...styles,
    ...placeholder
  })
}
