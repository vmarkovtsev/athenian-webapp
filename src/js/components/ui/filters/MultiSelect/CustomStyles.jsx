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
    background: '#F3F3F5',
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
      minHeight: 38,
      display: 'grid',
      alignItems: 'center',
      borderBottom: '1px solid #D6DBE4',
      gridTemplateColumns: '20px calc(100% - 16px)',
      gridColumnGap: 4,
      padding: `${option && option.options ? '6px 12px 6px 24px' : '6px 12px'}`
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
    background: '#fafafb',
    color: 'rgb(18, 19, 67)',
    fontSize: 11,
    padding: '6px 12px 6px 12px',
    margin: 0,
    borderBottom: '1px solid #D6DBE4',
    display: 'grid',
    gridTemplateColumns: '18px 25px  auto 18px',
    alignItems: 'center',
    gridColumnGap: 8
  })
}

// Color ranges used to generate new colors based on strings
// for teams select
export const brandColors = [
  [210.6, 85, 50.2],
  [263.1, 69.1, 63.1],
  [0.3, 85.2, 57.6],
  [263.1, 69.1, 63.1],
  [340.1, 97.4, 53.9],
  [21.7, 81.3, 31.4],
  [36.9, 100, 51.6],
  [145.2, 62.5, 49.2],
  [45.9, 100, 51.6],
  [181.8, 70, 47.1]
]
