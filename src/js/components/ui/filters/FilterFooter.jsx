import React from 'react'
import classnames from 'classnames'

export const FilterFooter = ({ onCancel, onAccept, isAcceptable }) => (
  <div className="bg-white filter-buttons border-top px-3 py-2 text-right">
    <button onClick={onCancel} className="btn btn-link text-secondary px-3">Cancel</button>
    <button
      disabled={!isAcceptable}
      onClick={onAccept}
      className={classnames('btn btn-orange px-3', !isAcceptable && 'btn-disabled')}
    >
      Apply
    </button>
  </div>
)
