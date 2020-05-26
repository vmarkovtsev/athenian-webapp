import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { fetchVersions } from 'js/services/api/index';

export default () => {
  const [versions, setVersions] = useState("");

  useEffect(() => {
    const getAndSetVersions = async () => {
      const versions = _(await fetchVersions()).map((v, k) => `${k} v${v}`).join(" · ");
      setVersions(versions);
    };
    getAndSetVersions();
  });

  return <footer className="sticky-footer bg-white border-top">
    <div className="container my-auto">
      <div className="text-center my-auto">
        <span>Copyright &copy; Athenian.co 2020</span><br/><span class="text-bright small">{versions}</span>
      </div>
    </div>
  </footer>
};
