import SearchIcon from './SearchIcon.svg'

const placeholder = name => ({
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
})

export const customStyles = label => ({
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
  option: (styles, state) => ({
    ...styles,
    cursor: 'pointer',
    background: 'transparent',
    color: '#121343'
  }),
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
    left: '-1px'
  }),
  menuList: styles => ({
    ...styles,
    padding: 0
  }),
  input: styles => ({
    ...styles,
    ...placeholder(label)
  }),
  placeholder: styles => ({
    ...styles,
    ...placeholder(label)
  })
})
