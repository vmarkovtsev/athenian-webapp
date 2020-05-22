import SearchIcon from './IconSearch.svg'

/**
 * Overrides react-select components styles
 */
const placeholder = {
  alignItems: 'center',
  display: 'flex',
  ':before': {
    background: `url(${SearchIcon}) no-repeat`,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 14,
    width: 14,
  }
}

export const customStyles = {
  container: styles => ({
    ...styles,
    position: 'absolute',
    background: '#e7e7ec',
    border: '1px solid #cccccc',
    top: 'calc(100% + 8px)'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: 'transparent',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    visibility: 'hidden'
  }),
  option: (styles, state) => {
    const [option] = state.options
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#121343',
      display: 'grid',
      alignItems: 'center',
      borderBottom: '1px solid #D6DBE4',
      gridTemplateColumns: '20px calc(100% - 16px)',
      gridColumnGap: 8,
      padding: `${option && option.options ? '8px 12px 8px 24px' : '8px 12px'}`
    }
  },
  control: styles => ({
    ...styles,
    borderRadius: 0,
    paddingRight: '8px',
    margin: '10px 10px 1px'
  }),
  menu: styles => ({
    ...styles,
    marginTop: 0,
    borderRadius: 0,
    boxSizing: 'content-box',
    left: '-1px',
    boxShadow: 'none',
    border: '1px solid #ccc',
    borderTopWidth: 0
  }),
  menuList: styles => ({
    ...styles,
    padding: 0
  }),
  input: styles => ({
    ...styles,
    ...placeholder
  }),
  placeholder: styles => ({
    ...styles,
    ...placeholder
  }),
  group: styles => ({
    ...styles,
    padding: 0,
    background: 'white',
  }),
  groupHeading: styles => ({
    ...styles,
    textTransform: 'none',
    background: '#f4f4f7',
    color: 'rgb(18, 19, 67)',
    fontSize: 11,
    padding: 12,
    margin: 0,
    borderBottom: '1px solid #ccc',
    display: 'grid',
    gridTemplateColumns: '18px 25px  auto 18px',
    alignItems: 'center',
    gridColumnGap: 8
  })
}
