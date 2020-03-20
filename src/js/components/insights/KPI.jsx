import React from 'react';

import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';

import { number } from 'js/services/format';

/*
  Component that shows a simple KPI content insidea BoxKPI.

  - data: object{
        value: number (required)
        variation: number (required)
        unit: object{
            singular: string
            plural: string
        }
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
    <SimpleKPI data={data}></SimpleKPI>
  </BoxKPI>

 */
export const SimpleKPI = ({data}) => {
    let unit;
    if (data.unit) {
        if (data.value > 1) {
            unit = data.unit.plural;
        } else {
            unit = data.unit.singular;
        }
    }

    return (
        <div className="font-weight-bold">
          <BigNumber content={data.value + (unit ? " " + unit : "")} />
          {data.variation && <Badge value={number.round(data.variation)} trend className="ml-2" />}
        </div>
    );
};
