import React, { ReactElement, FunctionComponent } from 'react';
import { Select } from 'antd';
import { Person } from '../../../../../interfaces';

export interface IPersonsSelectProps {
    defaultValue?: string[]
    filterOptions: (input: string, option: ReactElement) => boolean
    onDeselect: (e: string | any) => any
    onSelect: (e: string | any) => any
    persons: Person[]
}

export const PersonsSelect: FunctionComponent<IPersonsSelectProps> = ({ defaultValue, filterOptions, onDeselect, onSelect, persons }) => (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Vous pouvez en rechercher ou en créer"
      allowClear
      optionFilterProp="children"
      filterOption={filterOptions}
      onSelect={onSelect}
      onDeselect={onDeselect}
      defaultValue={defaultValue}
    >
        {persons.map((person: Person) => (
          <Select.Option key={person.id}>
              {person.first_name} {person.last_name}
          </Select.Option>
        ))}
    </Select>
);

export default PersonsSelect;
