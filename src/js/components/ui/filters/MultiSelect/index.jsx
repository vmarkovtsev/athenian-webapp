import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Select from 'react-select'
import { usersLabelFormat, Dropdown, Group, Placeholder, Option, Menu as CustomMenu } from './CustomComponents'
import { customStyles as styles } from './CustomStyles'
import { mapContribsToTeam } from 'js/pages/pipeline/Filters/filterReducer'

import { github } from 'js/services/format'

import _ from 'lodash'

const formatMessage = message => () => <em>{message}</em>

const defaultProps = {
  backspaceRemovesValue: false,
  closeMenuOnSelect: false,
  isClearable: false,
  openMenuOnClick: false,
  isSearchable: true,
  isMulti: true,
  hideSelectedOptions: false,
  controlShouldRenderValue: false,
  tabSelectsValue: false
}

export const RepositoriesMultiSelect = props => {
  const {
    onApply,
    isLoading,
    options,
    initialValues,
  } = props

  const reposLabelFormat = repo => (github.repoName(repo) || 'UNKNOWN')
  const getOptionValueRepos = val => val

  return (
    <MultiSelect
      label="Repositories"
      className="filter"
      name="repositories"
      noDataMsg="There are no repositories for the date interval filter"
      isLoading={isLoading}
      getOptionLabel={reposLabelFormat}
      getOptionValue={getOptionValueRepos}
      options={options}
      onApply={onApply}
      initialValues={initialValues}
      keepSelectedOptionsOnApply={true}
    />
  )

}

export const UsersMultiSelect = props => {
  const {
    onApply,
    isLoading,
    options,
    initialValues,
    teams,
  } = props

  const getOptionValueUsers = val => `${val.team} ${val.name} ${val.login}`

  let processedOpts, extOptsFn
  if (teams.length > 0) {
    processedOpts =  mapContribsToTeam(options, teams)
    extOptsFn = extendOptionsUser
  } else {
    processedOpts = options
    extOptsFn = null
  }

  return (
    <MultiSelect
      label="Users"
      className="filter"
      name="users"
      noDataMsg="There are no users for the date interval and repositories filters"
      isLoading={isLoading}
      getOptionLabel={usersLabelFormat}
      getOptionValue={getOptionValueUsers}
      options={processedOpts}
      onApply={onApply}
      initialValues={initialValues}
      uniquenessKey={"login"}
      keepSelectedOptionsOnApply={true}
      extendOptionsFn={extOptsFn}
    />
  )

}

const MultiSelect = multiSelectProps => {
  const {
    label,
    noDataMsg,
    className,
    name,
    getOptionValue,
    getOptionLabel,
    onApply,
    isLoading,
    options,
    initialValues,
    uniquenessKey,
    keepSelectedOptionsOnApply,
    extendOptionsFn,
  } = multiSelectProps
  const previousSelection = useRef(initialValues)

  let extendedOptions, defaultValue
  if (keepSelectedOptionsOnApply) {
    const extOptsFn = extendOptionsFn || extendOptions
    extendedOptions = extOptsFn(options, previousSelection.current)
    defaultValue = computeDefaultValue(initialValues, previousSelection.current)
  } else {
    extendedOptions = options
    defaultValue = initialValues
  }

  const [isMenuOpen, setMenuOpen] = useState(false)
  const initialCount = useRef(multiSelectSelectedCount(defaultValue, uniquenessKey))
  const [currentCount, setCurrentCount] = useState(initialCount.current)


  const toggle = () => setMenuOpen(!isMenuOpen)
  const closeMenu = useCallback(() => {
    setCurrentCount(initialCount.current)
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const closeMenuIfNotThis = (e) => {
      if (!e.target.closest(`#multi-select-${label}`)) {
        closeMenu()
      }
    }

    const body = window.document.body
    body.addEventListener('click', closeMenuIfNotThis)
    return () => body.removeEventListener('click', closeMenuIfNotThis)
  }, [closeMenu, label])

  useEffect(() => {
    if (!isLoading) {
      initialCount.current = multiSelectSelectedCount(defaultValue, uniquenessKey)
      setCurrentCount(initialCount.current)
      previousSelection.current = defaultValue
    }
  }, [uniquenessKey, defaultValue, isLoading])

  const Menu = useMemo(() => CustomMenu(
    (values) => {
      previousSelection.current = values
      const appliedValues = uniquenessKey ? _(values).uniqBy(uniquenessKey).value() : values
      onApply(appliedValues)
      setMenuOpen(false)
    }, closeMenu
  ), [closeMenu, onApply, uniquenessKey])

  const noData = formatMessage(noDataMsg)
  const loading = formatMessage('loading...')

  const onSelectionChange = (values) => {
    setCurrentCount(multiSelectSelectedCount(values, uniquenessKey))
  }

  return (
    <div id={`multi-select-${label}`}>
      <Dropdown
        label={label}
        isLoading={isLoading}
        count={currentCount}
        onClick={toggle}
        isOpen={isMenuOpen}
      />
      {isMenuOpen &&
       <Select
         menuIsOpen={isMenuOpen}
         autoFocus={isMenuOpen}
         options={extendedOptions}
         className={className}
         name={name}
         getOptionLabel={getOptionLabel}
         getOptionValue={getOptionValue}
         noOptionsMessage={noData}
         loadingMessage={loading}
         onChange={onSelectionChange}
         defaultValue={defaultValue}
         components={{ Option, Placeholder, Group, Menu }}
         styles={styles}
         {...defaultProps}
       />
      }
    </div>
  )
}

const multiSelectSelectedCount = (values, uniquenessKey) => {
  if (!uniquenessKey) {
    return values.length;
  }

  return _(values).uniqBy(uniquenessKey).value().length;
}

const extendOptionsUser = (options, previousSelection) => {
  const extendedOptions = [...options]

  return _(previousSelection).reduce((extOpts, prevSel) => {
    const matchingTeam = (
      _(extOpts).find(['label', prevSel.team]) ||
      _(extOpts).find(['label', "Other"])
    )
    if (!_(matchingTeam.options).find(['login', prevSel.login])) {
      matchingTeam.options.push(prevSel)
    }

    return extOpts
  }, extendedOptions)
}

const extendOptions = (options, previousSelection) => {
  const extendedOptions = [...options]

  return _(previousSelection).reduce((extOpts, prevSel) => {
    const missing = !(_.isObject(prevSel) ?
                      _(extOpts).find(prevSel) :
                      _(extOpts).includes(prevSel))
    if (missing) {
      extOpts.push(prevSel)
    }

    return extOpts
  }, extendedOptions)
}

const computeDefaultValue = (initialValues, previousSelection) => {
  if (previousSelection.length === 0) {
    return initialValues
  }

  return previousSelection
}

export default MultiSelect
