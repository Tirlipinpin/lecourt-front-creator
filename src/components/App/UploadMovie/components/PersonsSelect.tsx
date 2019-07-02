import React, { ReactElement } from 'react';
import { Select } from 'antd';

import { Person } from '../../interfaces';

export interface IPersonsSelectProps {
    persons: Person[]
    handleChange: (persons: string[]) => void
    filterOptions: (input: string, option: ReactElement) => boolean
}

export default ({ persons, handleChange, filterOptions }: IPersonsSelectProps) => (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Vous pouvez en rechercher ou en créer"
      onChange={handleChange}
      allowClear
      optionFilterProp="children"
      filterOption={filterOptions}
    >
        {persons.map((person: Person) => (
          <Select.Option key={person.id}>
              {person.firstName} {person.lastName}
          </Select.Option>
        ))}
    </Select>
);
