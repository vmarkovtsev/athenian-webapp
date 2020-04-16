import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Page from 'js/pages/templates/Page';

import BreadcrumbsContext from 'js/context/Breadcrumbs';

const slides = [
  {
    src: 'https://picsum.photos/480/270?buster=1',
    alt: 'First slide',
  },
  {
    src: 'https://picsum.photos/480/270?buster=2',
    alt: 'Second slide',
  },
  {
    src: 'https://picsum.photos/480/270?buster=3',
    alt: 'Third slide',
  },
];

export default () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 30000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <BreadcrumbsContext>
      <Page>
        <div className="row">
          <div className="col-12 mt-3 mb-3">
            <div id="carousel-waiting" className="carousel slide w-75 mx-auto" data-ride="carousel">
              <ol className="carousel-indicators">
                {slides.map((slide, index) => {
                  return <li key={index} data-target="#carousel-waiting" data-slide-to={index} className={index === 0 ? "active" : ""}></li>;
                })}
              </ol>
              <div className="carousel-inner">
                {slides.map((slide, index) => {
                  return (
                    <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                      <img className="d-block w-100" src={slide.src} alt={slide.alt} />
                    </div>
                  );
                })}
              </div>
              <span className="carousel-control-prev" data-target="#carousel-waiting" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </span>
              <span className="carousel-control-next" data-target="#carousel-waiting" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-1 text-center">
            <h3>foo bar</h3>
            <h3>foo bar</h3>
            <h3>foo bar</h3>
          </div>
        </div>
      </Page>
    </BreadcrumbsContext>
  );
};
