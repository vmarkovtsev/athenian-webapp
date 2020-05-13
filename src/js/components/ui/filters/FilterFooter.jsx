import React from 'react'
import classnames from 'classnames'

export const FilterFooter = ({ onCancel, onAccept, isAcceptable }) => (
  <div className="bg-white border-top px-4 py-3 text-right">
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
