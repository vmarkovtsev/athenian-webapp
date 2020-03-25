import React from 'react';

import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';

import { number } from 'js/services/format';

/*
  Component that shows a simple KPI content insidea BoxKPI.

  - data: object{
        value: number (required)
        variation: number (optional)
        unit: string | object{
            singular: string
            plural: string
        } (optional)
    }

  E.g:

  const title = "a title";
  const subtitle = "a subtitle";
  const data = {
      value: 10,
      variation: -2,
      unit: {
          singular: "Pull request",
          plural: "Pull requests"
      }
  };

  <BoxKPI title={title} subtitle={subtitle}>
    <SimpleKPI {...data}></SimpleKPI>
  </BoxKPI>

 */
export const SimpleKPI = ({ unit, value, variation }) => {
    let appliedUnit = '';
    if (typeof unit === 'string') {
        appliedUnit = ` ${unit}`;
    } else if (unit && unit.singular && unit.plural) {
        appliedUnit = ` ${value > 1 ? unit.plural : unit.singular}`;
    }

    return (
        <div className="font-weight-bold">
            <BigNumber content={value + appliedUnit} />
            {variation && <Badge value={number.round(variation)} trend className="ml-2" />}
        </div>
    );
};
