import React, { ReactElement, FunctionComponent } from 'react';
import { Select } from 'antd';
import { Person } from '../../../../../interfaces';

export interface IPersonsSelectProps {
    persons: Person[]
    filterOptions: (input: string, option: ReactElement) => boolean
    onSelect: (e: string | any) => any
    onDeselect: (e: string | any) => any
}

export const PersonsSelect: FunctionComponent<IPersonsSelectProps> = ({ persons, filterOptions, onSelect, onDeselect }) => (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Vous pouvez en rechercher ou en créer"
      allowClear
      optionFilterProp="children"
      filterOption={filterOptions}
      onSelect={onSelect}
      onDeselect={onDeselect}
    >
        {persons.map((person: Person) => (
          <Select.Option key={person.id}>
              {person.firstName} {person.lastName}
          </Select.Option>
        ))}
    </Select>
);

export default PersonsSelect;
