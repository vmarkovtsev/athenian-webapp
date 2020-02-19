import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-regular-svg-icons'

export default ({ content }) => {
    const [copiedState, setCopiedState] = useState(false);

    return (
        <CopyToClipboard
            text={content}
            onCopy={() => setCopiedState(true)}
        >
            <button type="button" className="py-1 btn btn-outline-secondary">
                {!copiedState ? (
                    <>
                        <FontAwesomeIcon icon={faClone} className="mr-2 text-secondary text-gray-400" />
                        copy
                    </>
                ) : (
                        'copied'
                    )}
            </button>
        </CopyToClipboard>
    );
};
