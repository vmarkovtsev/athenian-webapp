import React from 'react';

import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';

import { number } from 'js/services/format';

/*
  Component that shows a simple KPI content insidea BoxKPI.

  - params: object{
        value: number (required)
        variation: number (optional)
        variationMeaning: NEGATIVE_IS_BETTER | POSITIVE_IS_BETTER (optional, default:POSITIVE_IS_BETTER)
        unit: string | object{
            singular: string
            plural: string
        } (optional)
    }

  E.g:

  const title = "a title";
  const subtitle = "a subtitle";
  const params = {
      value: 10,
      variation: -2,
      unit: {
          singular: "Pull request",
          plural: "Pull requests"
      }
  };

  <BoxKPI title={title} subtitle={subtitle}>
    <SimpleKPI {...params}></SimpleKPI>
  </BoxKPI>

 */
export const SimpleKPI = ({params}) => (
    <div className="font-weight-bold">
      <BigNumber content={buildContent(params.value, getUnit(params.value, params.unit))} />
      <Badge value={number.round(params.variation)} trend={params.variationMeaning} className="ml-2" />
    </div>
);

export const MultiKPI = ({params}) => (
    <div className="font-weight-bold">
      {params.map((v, i) => (
          <BigNumber key={i} content={buildContent(v.value, getUnit(v.value, v.unit))}
                     className={i === params.length - 1 ? "" : "mr-3"} />
      ))}
    </div>
);

const buildContent = (value, unit) => value + (unit ? ` ${unit}` : "");

const getUnit = (value, unitConf) => {
    let unit = '';
    if (typeof unitConf === 'string') {
        unit = unitConf;
    } else if (unitConf && unitConf.singular && unitConf.plural) {
        unit = (value !== 1) ? unitConf.plural : unitConf.singular;
    }

    return unit;
};
