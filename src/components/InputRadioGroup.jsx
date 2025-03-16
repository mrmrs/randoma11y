import * as React from 'react';
import { Radio } from '@base-ui-components/react/radio';
import { RadioGroup } from '@base-ui-components/react/radio-group';

export default function ExampleRadioGroup({ colorPair }) {
  // Extract colors from colorPair
  const foregroundColor = colorPair ? colorPair[0] : 'orange';
  const backgroundColor = colorPair ? colorPair[1] : 'pink';

  return (
    <RadioGroup
      aria-labelledby="apples-caption"
      defaultValue="fuji-apple"
      className="RadioGroup"
    >
      <style>
        {`
        .RadioGroup {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            color: ${backgroundColor};
            font-size: 12px;
          }

          .Caption {
            font-weight: 500;
            white-space: nowrap;
            color: ${backgroundColor};
          }

          .Item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            white-space: nowrap;
            color: ${backgroundColor};

          }

          .Radio {
            appearance: none;
            -webkit-appearance: none;
            background-color: ${backgroundColor};
            box-sizing: border-box;
            display: flex;
            width: 16px;
            height: 16px;
            aspect-ratio: 1;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            outline: 0;
            padding: 0;
            margin: 0;
            border: none;
            overflow: hidden;
          }

          .Radio[data-state="unchecked"] {
            border: 1px solid ${backgroundColor};
            background-color: transparent;
          }

          .Radio[data-state="checked"] {
            background-color: ${foregroundColor};
            border-radius: 100%;
          }

          .Radio:focus-visible,
          .Radio:focus {
            outline: 1px solid ${backgroundColor};
            outline-offset: 2px;
            border-radius: 100%!important;
            overflow: hidden;
          }

          .Indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            overflow: hidden;
          }

          .Indicator[data-state="unchecked"] {
            display: none;
          }

          .Indicator::before {
            content: ' ';
            border-radius: 100%!important;
            width: 0.5rem;
            height: 0.5rem;
            aspect-ratio: 1;
            background-color: ${foregroundColor};
          }

        `}
      </style>

      <div className='Caption' id="apples-caption">
        Radio Group
      </div>

      <label className='Item'>
        <Radio.Root value="fuji-apple" className='Radio'>
          <Radio.Indicator className="Indicator" />
        </Radio.Root>
        Option 1
      </label>

      <label className="Item">
        <Radio.Root value="gala-apple" className='Radio'>
          <Radio.Indicator className="Indicator" />
        </Radio.Root>
        Option 2
      </label>

      <label className="Item">
        <Radio.Root value="granny-smith-apple" className='Radio'>
          <Radio.Indicator className="Indicator" />
        </Radio.Root>
        Option 3
      </label>
    </RadioGroup>
  );
}
