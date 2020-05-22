import SearchIcon from './IconSearch.svg'

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
      minHeight: 36,
      padding: `${option && option.options ? '6px 12px 6px 24px' : '6px 12px'}`,
      gridColumnGap: 4
    }
  },
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
    boxShadow: 'none',
    border: '1px solid #E7E7EC',
    borderTopWidth: 0
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
