import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  InputOTPBase,
  InputOTPGroupBase,
  InputOTPSeparatorBase,
  InputOTPSlotBase,
} from "@/components/ui/Input-OTP-Base";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import * as React from "react";

const meta: Meta<typeof InputOTPBase> = {
  title: "forms/InputOTP",
  component: InputOTPBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "InputOTP para autenticação, códigos de uso único e validação controlada.",
      },
      source: {
        code: `import React from 'react';
import { InputOTPBase, InputOTPGroupBase, InputOTPSlotBase, InputOTPSeparatorBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <InputOTPBase maxLength={6}>
      <InputOTPGroupBase>
        <InputOTPSlotBase index={0} />
        <InputOTPSlotBase index={1} />
        <InputOTPSlotBase index={2} />
      </InputOTPGroupBase>
      <InputOTPSeparatorBase />
      <InputOTPGroupBase>
        <InputOTPSlotBase index={3} />
        <InputOTPSlotBase index={4} />
        <InputOTPSlotBase index={5} />
      </InputOTPGroupBase>
    </InputOTPBase>
  );
}

export default Example;`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InputOTPBase>;

export const Basic: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <InputOTPBase maxLength={6} className="justify-center flex gap-1.5">
        <InputOTPGroupBase className="flex gap-1">
          <InputOTPSlotBase index={0} />
          <InputOTPSlotBase index={1} />
          <InputOTPSlotBase index={2} />
        </InputOTPGroupBase>
        <InputOTPSeparatorBase />
        <InputOTPGroupBase className="flex gap-1">
          <InputOTPSlotBase index={3} />
          <InputOTPSlotBase index={4} />
          <InputOTPSlotBase index={5} />
        </InputOTPGroupBase>
      </InputOTPBase>
    </div>
  ),
};

Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      code: `import { InputOTPBase, InputOTPGroupBase, InputOTPSlotBase, InputOTPSeparatorBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <InputOTPBase maxLength={6} className='justify-center flex gap-1.5'>
      <InputOTPGroupBase className='flex gap-1'>
        <InputOTPSlotBase index={0} />
        <InputOTPSlotBase index={1} />
        <InputOTPSlotBase index={2} />
      </InputOTPGroupBase>
      <InputOTPSeparatorBase />
      <InputOTPGroupBase className='flex gap-1'>
        <InputOTPSlotBase index={3} />
        <InputOTPSlotBase index={4} />
        <InputOTPSlotBase index={5} />
      </InputOTPGroupBase>
    </InputOTPBase>
  );
}

export default Example;`,
    },
  },
};

export const PatternAlfanumerico: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <InputOTPBase
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        className="flex justify-center gap-1"
      >
        <InputOTPGroupBase className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlotBase key={i} index={i} />
          ))}
        </InputOTPGroupBase>
      </InputOTPBase>
    </div>
  ),
};

PatternAlfanumerico.parameters = {
  ...PatternAlfanumerico.parameters,
  docs: {
    ...PatternAlfanumerico.parameters?.docs,
    source: {
      code: `import { InputOTPBase, InputOTPGroupBase, InputOTPSlotBase } from '@mlw-packages/react-components';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

function Example() {
  return (
    <InputOTPBase maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} className='flex justify-center gap-1'>
      <InputOTPGroupBase className='flex gap-1'>
        {[0,1,2,3,4,5].map(i => <InputOTPSlotBase key={i} index={i} />)}
      </InputOTPGroupBase>
    </InputOTPBase>
  );
}

export default Example;`,
    },
  },
};

export const ComSeparadores: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <InputOTPBase maxLength={6} className="flex justify-center gap-1">
        <InputOTPGroupBase className="flex gap-1">
          <InputOTPSlotBase index={0} />
          <InputOTPSlotBase index={1} />
        </InputOTPGroupBase>
        <InputOTPSeparatorBase />
        <InputOTPGroupBase className="flex gap-1">
          <InputOTPSlotBase index={2} />
          <InputOTPSlotBase index={3} />
        </InputOTPGroupBase>
        <InputOTPSeparatorBase />
        <InputOTPGroupBase className="flex gap-1">
          <InputOTPSlotBase index={4} />
          <InputOTPSlotBase index={5} />
        </InputOTPGroupBase>
      </InputOTPBase>
    </div>
  ),
};

ComSeparadores.parameters = {
  ...ComSeparadores.parameters,
  docs: {
    ...ComSeparadores.parameters?.docs,
    source: {
      code: `import { InputOTPBase, InputOTPGroupBase, InputOTPSlotBase, InputOTPSeparatorBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <InputOTPBase maxLength={6} className='flex justify-center gap-1'>
      <InputOTPGroupBase className='flex gap-1'>
        <InputOTPSlotBase index={0} />
        <InputOTPSlotBase index={1} />
      </InputOTPGroupBase>
      <InputOTPSeparatorBase />
      <InputOTPGroupBase className='flex gap-1'>
        <InputOTPSlotBase index={2} />
        <InputOTPSlotBase index={3} />
      </InputOTPGroupBase>
      <InputOTPSeparatorBase />
      <InputOTPGroupBase className='flex gap-1'>
        <InputOTPSlotBase index={4} />
        <InputOTPSlotBase index={5} />
      </InputOTPGroupBase>
    </InputOTPBase>
  );
}

export default Example;`,
    },
  },
};

export const Controlado: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = React.useState("");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="space-y-3 max-w-xs mx-auto">
          <InputOTPBase
            maxLength={6}
            value={controlledValue}
            onChange={setControlledValue}
            className="flex justify-center gap-1"
          >
            <InputOTPGroupBase className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlotBase key={i} index={i} />
              ))}
            </InputOTPGroupBase>
          </InputOTPBase>
          <p className="text-center text-sm text-gray-400">
            {controlledValue === ""
              ? "Enter your one-time password."
              : `You entered: ${controlledValue}`}
          </p>
        </div>
      </div>
    );
  },
};

Controlado.parameters = {
  ...Controlado.parameters,
  docs: {
    ...Controlado.parameters?.docs,
    source: {
      code: `import React from 'react';
import { InputOTPBase, InputOTPGroupBase, InputOTPSlotBase } from '@mlw-packages/react-components';

function Example() {
  const [value, setValue] = React.useState('');

  return (
    <div className='space-y-3 max-w-xs mx-auto'>
      <InputOTPBase
        maxLength={6}
        value={value}
        onChange={setValue}
        className='flex justify-center gap-1'
      >
        <InputOTPGroupBase className='flex gap-1'>
          {[0,1,2,3,4,5].map(i => <InputOTPSlotBase key={i} index={i} />)}
        </InputOTPGroupBase>
      </InputOTPBase>
  <p className='text-center text-sm text-gray-400'>{value === '' ? 'Enter your one-time password.' : 'You entered: ' + value}</p>
    </div>
  );
}

export default Example;`,
    },
  },
};
