import React, {useState} from 'react';
import { useAuth0 } from 'js/context/Auth0';
import Simple from 'js/pages/templates/Simple';
import 'js/components/development/index.scss';

export const isDev = process.env.NODE_ENV === 'development';

export const isNotProd = ['development', 'staging'].includes(window.ENV?.environment);

export default {
    Breakpoints: () => (
        <div id="breakpoint-helper">
            <div className="breakPoints">
                <div className="breakPoint" id="xs">
                    <span className="desc">Phone</span>
                    <span className="size">(0px)</span>
                    <span className="name">xs</span>
                </div>
                <div className="breakPoint" id="sm">
                    <span className="desc">Tablet</span>
                    <span className="size">(768px)</span>
                    <span className="name">sm</span>
                </div>
                <div className="breakPoint" id="md">
                    <span className="desc">Small screen</span>
                    <span className="size">(992px)</span>
                    <span className="name">md</span>
                </div>
                <div className="breakPoint" id="lg">
                    <span className="desc">Medium screen</span>
                    <span className="size">(1200px)</span>
                    <span className="name">lg</span>
                </div>
                <div className="breakPoint" id="xl">
                    <span className="desc">Large screen</span>
                    <span className="size">(1300px)</span>
                    <span className="name">xl</span>
                </div>
            </div>
        </div>
    ),
    
    Bearer: () => {
      const { loading, isAuthenticated, getTokenSilently } = useAuth0();
      const [token, setToken] = useState("");

      if (loading) {
        return <Simple>Loading...</Simple>;
      }

      if (!isAuthenticated) {
        return (
          <Simple>
            Not authenticated!
          </Simple>
        );
      }

      (async () => setToken(await getTokenSilently()))();

      return <Simple><pre className="bearer-token">{token}</pre></Simple>;
    },

    errorBoxClass: isNotProd && 'development-error-box',
};
